import React, { useContext, useState } from "react";

import withAuth from "../utils/withAuth";

import { useNavigate } from "react-router-dom";

import "../App.css";

import { Button, TextField } from "@mui/material";

import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";

import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
    const navigate = useNavigate();

    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    // ==========================================
    // JOIN EXISTING MEETING
    // ==========================================

    const handleJoinVideoCall = async () => {
        const code = meetingCode.trim();

        // Don't continue if input is empty
        if (!code) return;

        // Save meeting in user's history
        await addToUserHistory(code);

        // Navigate to meeting room
        navigate(`/${code}`);
    };

    // ==========================================
    // START NEW MEETING
    // ==========================================

    const handleStartNewMeeting = async () => {
        // Generate random meeting code
        const randomCode = Math.random()
            .toString(36)
            .substring(2, 8);

        // Copy meeting link to clipboard
        await navigator.clipboard.writeText(
            `${window.location.origin}/${randomCode}`
        );

        // Save meeting in history
        await addToUserHistory(randomCode);

        // Navigate to meeting
        navigate(`/${randomCode}`);
    };

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#080808",
                color: "#ffffff",
                fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
        >
            {/* ================================================= */}
            {/* NAVBAR */}
            {/* ================================================= */}

            <div
                style={{
                    height: "100px",
                    padding: "0 60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #292929",
                    background: "#080808",
                    boxSizing: "border-box",
                }}
            >
                {/* LOGO */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <div
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "14px",
                            background: "#287bdc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <VideoCallIcon
                            style={{
                                color: "#ffffff",
                                fontSize: 30,
                            }}
                        />
                    </div>

                    <span
                        style={{
                            fontWeight: 600,
                            fontSize: "30px",
                            color: "#ffffff",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        VibeCall
                    </span>
                </div>

                {/* NAVIGATION BUTTONS */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    {/* HISTORY */}

                    <Button
                        startIcon={<RestoreIcon />}
                        onClick={() => navigate("/history")}
                        style={{
                            color: "#ffffff",
                            border: "2px solid #353535",
                            borderRadius: "14px",
                            padding: "12px 24px",
                            fontSize: "18px",
                            textTransform: "none",
                            background: "transparent",
                        }}
                    >
                        History
                    </Button>

                    {/* LOGOUT */}

                    <Button
                        onClick={handleLogout}
                        style={{
                            color: "#ffffff",
                            border: "2px solid #353535",
                            borderRadius: "14px",
                            padding: "12px 28px",
                            fontSize: "18px",
                            textTransform: "none",
                            background: "transparent",
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* ================================================= */}
            {/* MAIN HERO SECTION */}
            {/* ================================================= */}

            <div
                style={{
                    minHeight: "calc(100vh - 100px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "120px 20px 60px",
                    boxSizing: "border-box",
                }}
            >
                {/* BADGE */}

                <div
                    style={{
                        background: "#062c58",
                        color: "#6eaef7",
                        padding: "10px 22px",
                        borderRadius: "12px",
                        fontSize: "18px",
                        marginBottom: "36px",
                    }}
                >
                    Free, unlimited meetings
                </div>

                {/* MAIN HEADING */}

                <h1
                    style={{
                        fontSize: "60px",
                        lineHeight: "1.15",
                        maxWidth: "850px",
                        margin: "0",
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-2px",
                    }}
                >
                    Bring Everyone Together
                </h1>

                {/* SUBTITLE */}

                <p
                    style={{
                        color: "#c7c7c7",
                        fontSize: "21px",
                        lineHeight: "1.4",
                        maxWidth: "760px",
                        margin: "36px 0 65px",
                    }}
                >
                    Start instantly or join with a code. No downloads, no
                    clutter, no waiting rooms.
                </p>

                {/* ================================================= */}
                {/* JOIN MEETING INPUT */}
                {/* ================================================= */}

                <div
                    style={{
                        display: "flex",
                        gap: "18px",
                        width: "100%",
                        maxWidth: "825px",
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Enter meeting code"
                        value={meetingCode}
                        onChange={(e) =>
                            setMeetingCode(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleJoinVideoCall();
                            }
                        }}
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                height: "68px",
                                backgroundColor: "#191919",
                                color: "#ffffff",
                                borderRadius: "12px",
                                fontSize: "20px",

                                "& fieldset": {
                                    borderColor: "#363636",
                                },

                                "&:hover fieldset": {
                                    borderColor: "#555555",
                                },

                                "&.Mui-focused fieldset": {
                                    borderColor: "#287bdc",
                                },
                            },

                            "& input": {
                                color: "#ffffff",
                            },

                            "& input::placeholder": {
                                color: "#aaaaaa",
                                opacity: 1,
                            },
                        }}
                    />

                    {/* JOIN BUTTON */}

                    <Button
                        variant="contained"
                        onClick={handleJoinVideoCall}
                        disabled={!meetingCode.trim()}
                        style={{
                            minWidth: "120px",
                            height: "68px",
                            borderRadius: "12px",
                            background: meetingCode.trim()
                                ? "#0b4f99"
                                : "#12304f",
                            color: meetingCode.trim()
                                ? "#8fc0f8"
                                : "#61758c",
                            fontSize: "20px",
                            textTransform: "none",
                            boxShadow: "none",
                        }}
                    >
                        Join
                    </Button>
                </div>

                {/* ================================================= */}
                {/* START NEW MEETING */}
                {/* ================================================= */}

                <Button
                    fullWidth
                    onClick={handleStartNewMeeting}
                    startIcon={
                        <VideoCallIcon
                            style={{
                                fontSize: 26,
                            }}
                        />
                    }
                    style={{
                        maxWidth: "825px",
                        height: "68px",
                        marginTop: "24px",
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#111111",
                        fontSize: "20px",
                        fontWeight: 500,
                        textTransform: "none",
                        boxShadow: "none",
                    }}
                >
                    Start new meeting
                </Button>

                {/* ================================================= */}
                {/* FEATURES */}
                {/* ================================================= */}

                <div
                    style={{
                        width: "100%",
                        maxWidth: "1000px",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(3, 1fr)",
                        gap: "100px",
                        marginTop: "95px",
                    }}
                >
                    {/* FEATURE 1 */}

                    <div>
                        <VideoCallIcon
                            style={{
                                color: "#65a8f5",
                                fontSize: 38,
                                marginBottom: "18px",
                            }}
                        />

                        <h3
                            style={{
                                fontSize: "20px",
                                margin: "0 0 8px",
                                fontWeight: 600,
                                color: "#ffffff",
                            }}
                        >
                            Instant start
                        </h3>

                        <p
                            style={{
                                color: "#999999",
                                fontSize: "17px",
                                margin: 0,
                            }}
                        >
                            No sign-up delays
                        </p>
                    </div>

                    {/* FEATURE 2 */}

                    <div>
                        <ChatBubbleOutlineIcon
                            style={{
                                color: "#65a8f5",
                                fontSize: 38,
                                marginBottom: "18px",
                            }}
                        />

                        <h3
                            style={{
                                fontSize: "20px",
                                margin: "0 0 8px",
                                fontWeight: 600,
                                color: "#ffffff",
                            }}
                        >
                            Live chat
                        </h3>

                        <p
                            style={{
                                color: "#999999",
                                fontSize: "17px",
                                margin: 0,
                            }}
                        >
                            Built into every call
                        </p>
                    </div>

                    {/* FEATURE 3 */}

                    <div>
                        <ScreenShareIcon
                            style={{
                                color: "#65a8f5",
                                fontSize: 38,
                                marginBottom: "18px",
                            }}
                        />

                        <h3
                            style={{
                                fontSize: "20px",
                                margin: "0 0 8px",
                                fontWeight: 600,
                                color: "#ffffff",
                            }}
                        >
                            Screen share
                        </h3>

                        <p
                            style={{
                                color: "#999999",
                                fontSize: "17px",
                                margin: 0,
                            }}
                        >
                            One click sharing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);