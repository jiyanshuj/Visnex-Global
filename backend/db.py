from pymongo import MongoClient
from typing import Optional, List, Dict, Any
import os
from dotenv import load_dotenv
import math

load_dotenv()

# MongoDB Configuration
MONGODB_URL = os.getenv("MONGODB_URL")
if not MONGODB_URL:
    raise ValueError("MONGODB_URL environment variable is required. Please set it in .env file.")
DATABASE_NAME = os.getenv("DATABASE_NAME", "Visnex_global")

# Global database connection
_client: Optional[MongoClient] = None
_db = None


def get_database():
    """Get database connection"""
    global _client, _db
    if _db is None:
        _client = MongoClient(MONGODB_URL)
        _db = _client[DATABASE_NAME]
        print(f"Connected to MongoDB: {DATABASE_NAME}")
    return _db


def close_database():
    """Close database connection"""
    global _client
    if _client:
        _client.close()
        print("MongoDB connection closed")


# ==================== INVESTORS OPERATIONS ====================

def get_all_investors(
    page: int = 1,
    limit: int = 10,
    industry: Optional[str] = None,
    stage: Optional[str] = None,
    location: Optional[str] = None,
    deal_size: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None
) -> Dict[str, Any]:
    """Get all investors with filtering and pagination"""
    db = get_database()
    collection = db["investors"]
    
    # Build filter query
    filter_query = {}
    
    if industry:
        filter_query["focusIndustries"] = industry
    
    if stage:
        filter_query["investmentStages"] = stage
    
    if location:
        filter_query["location"] = {"$regex": location, "$options": "i"}
    
    if deal_size:
        filter_query["dealSize"] = deal_size
    
    if status:
        filter_query["status"] = status
    
    if search:
        filter_query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"investmentThesis": {"$regex": search, "$options": "i"}},
        ]
    
    # Get total count
    total = collection.count_documents(filter_query)
    
    # Calculate pagination
    skip = (page - 1) * limit
    total_pages = math.ceil(total / limit) if total > 0 else 0
    
    # Get paginated results
    investors = list(collection.find(filter_query, {"_id": 0}).skip(skip).limit(limit))
    
    return {
        "data": investors,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": total_pages
    }


def get_investor_by_id(investor_id: int) -> Optional[Dict[str, Any]]:
    """Get a specific investor by ID"""
    db = get_database()
    collection = db["investors"]
    investor = collection.find_one({"id": investor_id}, {"_id": 0})
    return investor


def create_investor(investor_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new investor"""
    db = get_database()
    collection = db["investors"]
    
    # Get the highest ID and increment
    last_investor = collection.find_one(sort=[("id", -1)])
    new_id = (last_investor["id"] + 1) if last_investor else 1
    
    investor_data["id"] = new_id
    collection.insert_one(investor_data)
    
    # Return without _id
    investor_data.pop("_id", None)
    return investor_data


def update_investor(investor_id: int, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Update an existing investor"""
    db = get_database()
    collection = db["investors"]
    
    # Remove None values
    update_data = {k: v for k, v in update_data.items() if v is not None}
    
    if update_data:
        collection.update_one({"id": investor_id}, {"$set": update_data})
    
    return collection.find_one({"id": investor_id}, {"_id": 0})


def delete_investor(investor_id: int) -> bool:
    """Delete an investor"""
    db = get_database()
    collection = db["investors"]
    result = collection.delete_one({"id": investor_id})
    return result.deleted_count > 0


def get_incubators() -> List[Dict[str, Any]]:
    """Get all incubators/accelerators"""
    db = get_database()
    collection = db["investors"]
    incubators = list(collection.find({"duration": {"$exists": True}}, {"_id": 0}))
    return incubators


def get_investor_industries() -> List[str]:
    """Get list of all unique industries"""
    db = get_database()
    collection = db["investors"]
    industries = collection.distinct("focusIndustries")
    return sorted(industries)


def get_investor_stages() -> List[str]:
    """Get list of all unique investment stages"""
    db = get_database()
    collection = db["investors"]
    stages = collection.distinct("investmentStages")
    return sorted(stages)


def get_investor_locations() -> List[str]:
    """Get list of all unique locations"""
    db = get_database()
    collection = db["investors"]
    locations = collection.distinct("location")
    return sorted(locations)


# ==================== STARTUPS OPERATIONS ====================

def get_all_startups(
    page: int = 1,
    limit: int = 10,
    industry: Optional[str] = None,
    funding_stage: Optional[str] = None,
    location: Optional[str] = None,
    min_team_size: Optional[int] = None,
    max_team_size: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = None,
    sort_order: str = "desc"
) -> Dict[str, Any]:
    """Get all startups with filtering, sorting, and pagination"""
    db = get_database()
    collection = db["startups"]
    
    # Build filter query
    filter_query = {}
    
    if industry:
        filter_query["industry"] = industry
    
    if funding_stage:
        filter_query["fundingStage"] = funding_stage
    
    if location:
        filter_query["location"] = {"$regex": location, "$options": "i"}
    
    if min_team_size is not None:
        filter_query["teamSize"] = {"$gte": min_team_size}
    
    if max_team_size is not None:
        if "teamSize" in filter_query:
            filter_query["teamSize"]["$lte"] = max_team_size
        else:
            filter_query["teamSize"] = {"$lte": max_team_size}
    
    if search:
        filter_query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"tagline": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
        ]
    
    # Get total count
    total = collection.count_documents(filter_query)
    
    # Calculate pagination
    skip = (page - 1) * limit
    total_pages = math.ceil(total / limit) if total > 0 else 0
    
    # Build sort query
    sort_query = []
    if sort_by:
        sort_direction = -1 if sort_order == "desc" else 1
        sort_query.append((sort_by, sort_direction))
    else:
        sort_query.append(("id", 1))
    
    # Get paginated results
    startups = list(
        collection.find(filter_query, {"_id": 0})
        .sort(sort_query)
        .skip(skip)
        .limit(limit)
    )
    
    return {
        "data": startups,
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": total_pages
    }


def get_startup_by_id(startup_id: int) -> Optional[Dict[str, Any]]:
    """Get a specific startup by ID"""
    db = get_database()
    collection = db["startups"]
    startup = collection.find_one({"id": startup_id}, {"_id": 0})
    return startup


def create_startup(startup_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new startup"""
    db = get_database()
    collection = db["startups"]
    
    # Get the highest ID and increment
    last_startup = collection.find_one(sort=[("id", -1)])
    new_id = (last_startup["id"] + 1) if last_startup else 1
    
    startup_data["id"] = new_id
    startup_data["lastActive"] = "Just now"
    collection.insert_one(startup_data)
    
    # Return without _id
    startup_data.pop("_id", None)
    return startup_data


def update_startup(startup_id: int, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Update an existing startup"""
    db = get_database()
    collection = db["startups"]
    
    # Remove None values
    update_data = {k: v for k, v in update_data.items() if v is not None}
    
    if update_data:
        collection.update_one({"id": startup_id}, {"$set": update_data})
    
    return collection.find_one({"id": startup_id}, {"_id": 0})


def delete_startup(startup_id: int) -> bool:
    """Delete a startup"""
    db = get_database()
    collection = db["startups"]
    result = collection.delete_one({"id": startup_id})
    return result.deleted_count > 0


def get_startup_industries() -> List[Dict[str, Any]]:
    """Get list of all unique industries with counts"""
    db = get_database()
    collection = db["startups"]
    
    pipeline = [
        {"$group": {"_id": "$industry", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    result = list(collection.aggregate(pipeline))
    industries = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    return industries


def get_startup_funding_stages() -> List[Dict[str, Any]]:
    """Get list of all unique funding stages with counts"""
    db = get_database()
    collection = db["startups"]
    
    pipeline = [
        {"$group": {"_id": "$fundingStage", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    result = list(collection.aggregate(pipeline))
    stages = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    return stages


def get_startup_locations() -> List[str]:
    """Get list of all unique locations"""
    db = get_database()
    collection = db["startups"]
    locations = collection.distinct("location")
    return sorted(locations)


def get_startup_categories() -> List[Dict[str, Any]]:
    """Get list of all unique categories"""
    db = get_database()
    collection = db["startups"]
    
    pipeline = [
        {"$unwind": "$categories"},
        {"$group": {"_id": "$categories", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    result = list(collection.aggregate(pipeline))
    categories = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    return categories


def get_startup_tags() -> List[Dict[str, Any]]:
    """Get list of all unique tags"""
    db = get_database()
    collection = db["startups"]
    
    pipeline = [
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    result = list(collection.aggregate(pipeline))
    tags = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    return tags


# ==================== STATISTICS OPERATIONS ====================

def get_platform_stats() -> Dict[str, Any]:
    """Get platform statistics"""
    db = get_database()
    investors_collection = db["investors"]
    startups_collection = db["startups"]
    
    # Count active investors (excluding incubators)
    active_investors = investors_collection.count_documents({
        "status": "Active",
        "duration": {"$exists": False}
    })
    
    # Count incubators
    incubators = investors_collection.count_documents({
        "duration": {"$exists": True}
    })
    
    # Calculate total funding facilitated
    pipeline = [
        {"$match": {"status": "Active"}},
        {"$group": {"_id": None, "totalDeals": {"$sum": "$activeDeals"}}}
    ]
    result = list(investors_collection.aggregate(pipeline))
    total_deals = result[0]["totalDeals"] if result else 0
    
    # Calculate total connections
    pipeline = [
        {"$match": {"status": "Active"}},
        {"$group": {"_id": None, "totalPortfolio": {"$sum": "$portfolioCompanies"}}}
    ]
    result = list(investors_collection.aggregate(pipeline))
    active_connections = result[0]["totalPortfolio"] if result else 0
    
    # Estimate funding facilitated
    funding_facilitated = f"${round(total_deals * 5.2, 1)}B"
    
    return {
        "activeInvestors": active_investors,
        "incubators": incubators,
        "fundingFacilitated": funding_facilitated,
        "activeConnections": active_connections
    }


def get_dashboard_stats() -> Dict[str, Any]:
    """Get comprehensive dashboard statistics"""
    db = get_database()
    investors_collection = db["investors"]
    startups_collection = db["startups"]
    
    # Total counts
    total_investors = investors_collection.count_documents({})
    total_startups = startups_collection.count_documents({})
    active_investors = investors_collection.count_documents({"status": "Active"})
    
    # Funding stages distribution
    funding_stages = get_startup_funding_stages()
    
    # Industries distribution
    industries = get_startup_industries()
    
    # Investment stages distribution
    pipeline = [
        {"$unwind": "$investmentStages"},
        {"$group": {"_id": "$investmentStages", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    result = list(investors_collection.aggregate(pipeline))
    investment_stages = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    
    # Locations distribution
    pipeline = [
        {"$group": {"_id": "$location", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    result = list(startups_collection.aggregate(pipeline))
    top_locations = [{"name": item["_id"], "count": item["count"]} for item in result if item["_id"]]
    
    return {
        "totals": {
            "investors": total_investors,
            "startups": total_startups,
            "activeInvestors": active_investors
        },
        "fundingStages": funding_stages,
        "industries": industries,
        "investmentStages": investment_stages,
        "topLocations": top_locations
    }