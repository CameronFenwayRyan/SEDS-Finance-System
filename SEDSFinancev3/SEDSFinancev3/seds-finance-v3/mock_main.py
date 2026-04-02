from fastapi import FastAPI, Query, Body, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Dict, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Fake data ──────────────────────────────────────────────────────────────────

MOCK_TOKEN = "mock-token-abc123"

MOCK_USER = {
    "name": "Cameron Dev",
    "nuid": "123456789",
    "email": "dev@northeastern.edu",
    "permissions": ["Admin", "Rover", "Business"],
    "token": MOCK_TOKEN,
}

MOCK_OPTIONS = {
    "projects": ["Rover", "Payload", "Outreach"],
    "subteams": {
        "Rover":    ["Mechanical", "Electrical", "Software"],
        "Payload":  ["Structures", "Avionics"],
        "Outreach": ["Events", "Social Media"],
    },
    "account_codes": ["10000 - General", "20000 - Equipment", "30000 - Travel"],
    "budget_indices": ["Budget Account", "Cash Account"],
}

MOCK_REQUESTS = [
    {
        "id": 0,
        "description": "Buy 3D printer filament",
        "status": "Pending Approval",
        "requestee": "Cameron Dev",
        "project_name": "Rover",
        "subteam_name": "Mechanical",
        "account_code": "20000 - Equipment",
        "budget_index": "Budget Account",
        "request_cost": "$45.00",
        "final_cost": "",
        "tax": "",
        "link": "",
        "reciept_link": "",
        "sabo_link": "",
        "approver": "",
        "approval_date": "",
        "admin_approver": "",
        "admin_approval_date": "",
        "advisor_approver": "",
        "advisor_approval_date": "",
        "request_date": "03/28/2026 10:00:00",
        "submission_date": "",
        "notes": "",
    },
    {
        "id": 1,
        "description": "Soldering supplies",
        "status": "Pending Admin Approval",
        "requestee": "Matt Geisel",
        "project_name": "Rover",
        "subteam_name": "Electrical",
        "account_code": "20000 - Equipment",
        "budget_index": "Cash Account",
        "request_cost": "$120.00",
        "final_cost": "",
        "tax": "",
        "link": "",
        "reciept_link": "",
        "sabo_link": "",
        "approver": "Cameron Dev",
        "approval_date": "03/29/2026 09:30:00",
        "admin_approver": "",
        "admin_approval_date": "",
        "advisor_approver": "",
        "advisor_approval_date": "",
        "request_date": "03/27/2026 14:00:00",
        "submission_date": "",
        "notes": "Need ASAP",
    },
    {
        "id": 2,
        "description": "Conference travel reimbursement",
        "status": "Approved",
        "requestee": "Tarun Patel",
        "project_name": "Payload",
        "subteam_name": "Avionics",
        "account_code": "30000 - Travel",
        "budget_index": "Budget Account",
        "request_cost": "$350.00",
        "final_cost": "",
        "tax": "",
        "link": "",
        "reciept_link": "",
        "sabo_link": "",
        "approver": "Cameron Dev",
        "approval_date": "03/25/2026 11:00:00",
        "admin_approver": "Cameron Dev",
        "admin_approval_date": "03/26/2026 08:00:00",
        "advisor_approver": "",
        "advisor_approval_date": "",
        "request_date": "03/24/2026 16:00:00",
        "submission_date": "",
        "notes": "",
    },
]

# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"version": "MOCK 1.0", "description": "Mock SEDS Finance Backend"}


@app.get("/auth")
async def auth(nuid: str = '', password: str = ''):
    """ Any nuid/password combo succeeds in mock mode """
    if nuid == '' or password == '':
        return JSONResponse(status_code=400, content={"error": "Missing nuid or password"})
    if nuid != 'fucking' or password != 'please':
        return JSONResponse(status_code=401, content={"error": "Invalid nuid or password"})
    return {"token": MOCK_TOKEN, "user": MOCK_USER}


@app.get("/user")
async def get_user(token: str = ''):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    return MOCK_USER


@app.get("/options")
async def get_options():
    return MOCK_OPTIONS


@app.get("/requests")
async def get_requests(token: str = ''):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    return MOCK_REQUESTS


@app.get("/requests/{rqid}")
async def get_request(rqid: str, token: str = ''):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    idx = int(rqid)
    if idx < 0 or idx >= len(MOCK_REQUESTS):
        return JSONResponse(status_code=404, content={"error": "Request not found"})
    return MOCK_REQUESTS[idx]


@app.post("/request")
async def submit_request(
    token: str = Query(...),
    request: Dict = Body(...),
):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    new_id = len(MOCK_REQUESTS)
    new_req = {
        "id": new_id,
        "status": "Pending Approval",
        "request_date": "03/31/2026 12:00:00",
        "submission_date": "",
        "approver": "", "approval_date": "",
        "admin_approver": "", "admin_approval_date": "",
        "advisor_approver": "", "advisor_approval_date": "",
        "final_cost": "", "tax": "", "link": "",
        "reciept_link": "", "sabo_link": "",
        **request,
    }
    MOCK_REQUESTS.append(new_req)
    print(f"[MOCK] New request added: {new_req}")
    return {"id": new_id}


@app.post("/requests/{rqid}/approval")
async def approve_request(rqid: str, token: str = Query(...), request: Dict = Body(...)):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    idx = int(rqid)
    if idx < 0 or idx >= len(MOCK_REQUESTS):
        return JSONResponse(status_code=404, content={"error": "Request not found"})
    print(f"[MOCK] Approval for request {rqid}: {request}")
    # Simulate status progression
    req = MOCK_REQUESTS[idx]
    if req["status"] == "Pending Approval":
        req["status"] = "Pending Admin Approval"
        req["approver"] = MOCK_USER["name"]
        req["approval_date"] = "03/31/2026 12:00:00"
    elif req["status"] == "Pending Admin Approval":
        req["status"] = "Approved"
        req["admin_approver"] = MOCK_USER["name"]
        req["admin_approval_date"] = "03/31/2026 12:00:00"
    return {"status": req["status"]}


@app.post("/request/{rqid}/upload")
async def upload_files(
    rqid: str,
    token: str = Query(...),
    file_uploads: List[UploadFile] = File(...),
):
    if token != MOCK_TOKEN:
        return JSONResponse(status_code=401, content={"error": "Invalid token"})
    print(f"[MOCK] Files uploaded for request {rqid}: {[f.filename for f in file_uploads]}")
    idx = int(rqid)
    if 0 <= idx < len(MOCK_REQUESTS):
        MOCK_REQUESTS[idx]["status"] = "Awaiting SABO Verification"
    return {"uploaded": len(file_uploads)}
