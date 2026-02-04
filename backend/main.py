from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv
import db

load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Visnex API",
    description="API for managing startups and investors",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== PYDANTIC MODELS ====================

class InvestmentRange(BaseModel):
    min: str
    max: str


class InvestorCreate(BaseModel):
    name: str
    type: str
    logo: str
    location: str
    status: str = "Active"
    investmentRange: InvestmentRange
    focusIndustries: List[str]
    investmentStages: List[str]
    portfolioCompanies: int = 0
    activeDeals: int = 0
    investmentThesis: str
    dealSize: str


class InvestorUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    logo: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None
    investmentRange: Optional[InvestmentRange] = None
    focusIndustries: Optional[List[str]] = None
    investmentStages: Optional[List[str]] = None
    portfolioCompanies: Optional[int] = None
    activeDeals: Optional[int] = None
    investmentThesis: Optional[str] = None
    dealSize: Optional[str] = None


class StartupCreate(BaseModel):
    name: str
    logo: str
    tagline: str
    description: str
    industry: str
    fundingStage: str
    location: str
    funding: str
    teamSize: int
    founded: int
    growth: str
    categories: List[str]
    foundingTeam: List[str] = []
    tags: List[str] = []


class StartupUpdate(BaseModel):
    name: Optional[str] = None
    logo: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    fundingStage: Optional[str] = None
    location: Optional[str] = None
    funding: Optional[str] = None
    teamSize: Optional[int] = None
    founded: Optional[int] = None
    growth: Optional[str] = None
    categories: Optional[List[str]] = None
    foundingTeam: Optional[List[str]] = None
    tags: Optional[List[str]] = None


# ==================== STARTUP EVENTS ====================

@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    db.get_database()
    print("Application started successfully")


@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    db.close_database()
    print("Application shutdown successfully")


# ==================== ROOT ENDPOINT ====================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Visnex API",
        "version": "1.0.0",
        "endpoints": {
            "investors": "/api/investors",
            "startups": "/api/startups",
            "stats": "/api/stats",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# ==================== INVESTOR ENDPOINTS ====================

@app.get("/api/investors")
async def get_investors(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    industry: Optional[str] = None,
    stage: Optional[str] = None,
    location: Optional[str] = None,
    deal_size: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None
):
    """Get all investors with filtering and pagination"""
    try:
        result = db.get_all_investors(
            page=page,
            limit=limit,
            industry=industry,
            stage=stage,
            location=location,
            deal_size=deal_size,
            status=status,
            search=search
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/investors/{investor_id}")
async def get_investor(investor_id: int):
    """Get a specific investor by ID"""
    investor = db.get_investor_by_id(investor_id)
    if not investor:
        raise HTTPException(status_code=404, detail=f"Investor with id {investor_id} not found")
    return investor


@app.post("/api/investors", status_code=201)
async def create_investor(investor: InvestorCreate):
    """Create a new investor"""
    try:
        investor_data = investor.model_dump()
        result = db.create_investor(investor_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/api/investors/{investor_id}")
async def update_investor(investor_id: int, investor: InvestorUpdate):
    """Update an existing investor"""
    existing = db.get_investor_by_id(investor_id)
    if not existing:
        raise HTTPException(status_code=404, detail=f"Investor with id {investor_id} not found")
    
    try:
        update_data = investor.model_dump(exclude_none=True)
        result = db.update_investor(investor_id, update_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/investors/{investor_id}")
async def delete_investor(investor_id: int):
    """Delete an investor"""
    success = db.delete_investor(investor_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Investor with id {investor_id} not found")
    return {"message": f"Investor {investor_id} deleted successfully"}


@app.get("/api/investors/incubators/all")
async def get_incubators():
    """Get all incubators/accelerators"""
    try:
        incubators = db.get_incubators()
        return {"data": incubators, "total": len(incubators)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/investors/filters/industries")
async def get_investor_industries():
    """Get list of all unique industries"""
    try:
        industries = db.get_investor_industries()
        return {"industries": industries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/investors/filters/stages")
async def get_investor_stages():
    """Get list of all unique investment stages"""
    try:
        stages = db.get_investor_stages()
        return {"stages": stages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/investors/filters/locations")
async def get_investor_locations():
    """Get list of all unique locations"""
    try:
        locations = db.get_investor_locations()
        return {"locations": locations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== STARTUP ENDPOINTS ====================

@app.get("/api/startups")
async def get_startups(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    industry: Optional[str] = None,
    funding_stage: Optional[str] = None,
    location: Optional[str] = None,
    min_team_size: Optional[int] = None,
    max_team_size: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = Query(None, regex="^(matchPercentage|teamSize|founded)$"),
    sort_order: Optional[str] = Query("desc", regex="^(asc|desc)$")
):
    """Get all startups with filtering, sorting, and pagination"""
    try:
        result = db.get_all_startups(
            page=page,
            limit=limit,
            industry=industry,
            funding_stage=funding_stage,
            location=location,
            min_team_size=min_team_size,
            max_team_size=max_team_size,
            search=search,
            sort_by=sort_by,
            sort_order=sort_order
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/startups/{startup_id}")
async def get_startup(startup_id: int):
    """Get a specific startup by ID"""
    startup = db.get_startup_by_id(startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail=f"Startup with id {startup_id} not found")
    return startup


@app.post("/api/startups", status_code=201)
async def create_startup(startup: StartupCreate):
    """Create a new startup"""
    try:
        startup_data = startup.model_dump()
        result = db.create_startup(startup_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/api/startups/{startup_id}")
async def update_startup(startup_id: int, startup: StartupUpdate):
    """Update an existing startup"""
    existing = db.get_startup_by_id(startup_id)
    if not existing:
        raise HTTPException(status_code=404, detail=f"Startup with id {startup_id} not found")
    
    try:
        update_data = startup.model_dump(exclude_none=True)
        result = db.update_startup(startup_id, update_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/startups/{startup_id}")
async def delete_startup(startup_id: int):
    """Delete a startup"""
    success = db.delete_startup(startup_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Startup with id {startup_id} not found")
    return {"message": f"Startup {startup_id} deleted successfully"}


@app.get("/api/startups/filters/industries")
async def get_startup_industries():
    """Get list of all unique industries with counts"""
    try:
        industries = db.get_startup_industries()
        return {"industries": industries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/startups/filters/stages")
async def get_startup_funding_stages():
    """Get list of all unique funding stages with counts"""
    try:
        stages = db.get_startup_funding_stages()
        return {"fundingStages": stages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/startups/filters/locations")
async def get_startup_locations():
    """Get list of all unique locations"""
    try:
        locations = db.get_startup_locations()
        return {"locations": locations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/startups/filters/categories")
async def get_startup_categories():
    """Get list of all unique categories"""
    try:
        categories = db.get_startup_categories()
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/startups/filters/tags")
async def get_startup_tags():
    """Get list of all unique tags"""
    try:
        tags = db.get_startup_tags()
        return {"tags": tags}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== STATISTICS ENDPOINTS ====================

@app.get("/api/stats")
async def get_stats():
    """Get platform statistics"""
    try:
        stats = db.get_platform_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats/dashboard")
async def get_dashboard_stats():
    """Get comprehensive dashboard statistics"""
    try:
        stats = db.get_dashboard_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== RUN SERVER ====================

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 8000))
    HOST = os.getenv("HOST", "0.0.0.0")
    
    print(f"Starting Visnex API on {HOST}:{PORT}")
    print(f"Documentation available at http://{HOST}:{PORT}/docs")
    
    uvicorn.run(
        "main:app",
        host=HOST,
        port=PORT,
        reload=True
    )