import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366f1',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0); // 0 = Login, 1 = Register
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        setError('');
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setPassword("");
                setName("");
                setMessage(result || "Registration Successful!");
                setOpen(true);
                setError("");
                setFormState(0);
            }
        } catch (err) {
            console.log(err);
            let errMsg = err?.response?.data?.message || err?.message || "Something went wrong!";
            setError(errMsg);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh', background: '#0f172a' }}>
                <CssBaseline />
                
                {/* Left Side Decorative Panel */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        p: 4
                    }}
                >
                    {/* Background Glowing Orbs */}
                    <Box sx={{
                        position: 'absolute',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(0,0,0,0) 70%)',
                        top: '10%',
                        left: '10%',
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(0,0,0,0) 70%)',
                        bottom: '10%',
                        right: '10%',
                    }} />

                    {/* Branding Content */}
                    <Box sx={{ zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
                        <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '24px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', mb: 3 }}>
                            <VideoCallIcon sx={{ fontSize: 48, color: '#818cf8' }} />
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', mb: 2, letterSpacing: '-0.5px' }}>
                            VibeCall
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            Connect instantly with seamless high-quality video calling and communication.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Side Form Panel */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={0}
                    square
                    sx={{
                        background: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: { xs: 3, sm: 6 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 400
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'rgba(99,102,241,0.15)', color: '#818cf8', width: 56, height: 56 }}>
                            <LockOutlinedIcon sx={{ fontSize: 28 }} />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 3, color: '#f8fafc' }}>
                            {formState === 0 ? "Welcome Back" : "Create Account"}
                        </Typography>

                        {/* Custom Tab Switcher */}
                        <Box sx={{
                            display: 'flex',
                            p: '4px',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            width: '100%',
                            mb: 3
                        }}>
                            <Button
                                fullWidth
                                disableRipple
                                onClick={() => { setFormState(0); setError(''); }}
                                sx={{
                                    py: 1,
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    bgcolor: formState === 0 ? '#6366f1' : 'transparent',
                                    color: formState === 0 ? '#ffffff' : '#94a3b8',
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#4f46e5' : 'rgba(255,255,255,0.03)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                disableRipple
                                onClick={() => { setFormState(1); setError(''); }}
                                sx={{
                                    py: 1,
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    bgcolor: formState === 1 ? '#6366f1' : 'transparent',
                                    color: formState === 1 ? '#ffffff' : '#94a3b8',
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#4f46e5' : 'rgba(255,255,255,0.03)'
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon sx={{ color: '#64748b' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            bgcolor: 'rgba(255,255,255,0.02)'
                                        }
                                    }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        bgcolor: 'rgba(255,255,255,0.02)'
                                    }
                                }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: '#64748b' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        bgcolor: 'rgba(255,255,255,0.02)'
                                    }
                                }}
                            />

                            {error && (
                                <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    boxShadow: '0 4px 14px 0 rgba(99,102,241,0.39)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                                    }
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Notification Snackbar */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', borderRadius: '8px' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}