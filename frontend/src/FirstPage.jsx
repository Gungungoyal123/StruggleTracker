// import { useState } from "react";
// import {useNavigate} from  "react-router-dom";
// function FirstPage() {
//   const navigate=useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [isReset, setIsReset] = useState(false);
//   const [email,setemail]=useState("");
//   const [name,setname]=useState("");
//   const [password,setpassword]=useState("");
//   const handleemail=(e)=>{
//      setemail(e.target.value);
//   } 
//   const handlename=(e)=>{
//     setname(e.target.value);
//   }
//   const handlepassword=(e)=>{
//     setpassword(e.target.value);
//   }
//  const handlelogin=async (e)=>{
//       e.preventDefault();
//       const logindata={
//         email:email,
//         password:password
//       };
//      try {
//        const response=await fetch("http://localhost:8000/user/login",{
//           method:'POST',
//           headers:{
//             'content-type':'application/json',
//           },
//           body:JSON.stringify(logindata),
//        });
//        const data=await response.json();
//        if(response.ok){
//         localStorage.setItem("mytoken",data.token);
//         console.log("login succeessfull");
//         navigate("/dashboard");
//        } 
//        else{
//           console.log("unsuccessful login");
//        }
//      } catch (error) {
//         console.log(error);
//      }
//   }
//   const handlesignup=async(e)=>{
//     e.preventDefault();
//     const signupinfo={
//       name:name,
//       email:email,
//       password:password
//     }
//     try {
//       const response=await fetch("http://localhost:8000/user/signup",{
//            method:'POST',
//            headers:{
//            'content-type':'application/json',
//             },
//             body:JSON.stringify(signupinfo),
//       });
//       const data= await response.json();
//       if(response.ok){
//         console.log("successfull singup");
//       }
//       else{
//         console.log("unsuccessfull signup");
//       }
     
//     } catch (error) {
//       console.log(error);
//     }
//   }
//    const handlereset=async(e)=>{
//     e.preventDefault();
//     const resetinfo={
//       email:email
//     }
//     try {
//       const response=await fetch("http://localhost:8000/user/reset",{
//            method:'POST',
//            headers:{
//            'content-type':'application/json',
//             },
//             body:JSON.stringify(resetinfo),
//       });
//       const data= await response.json();
//       if(response.data.success){
//         navigate("/otppage", { state: { email: email } });
//         console.log("successfull ");
//       }
//       else{
//         console.log("unsuccessfull reset");
//       }
     
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // RESET SCREEN
//   if (isReset) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.centerBox}>
//           <div style={styles.logoRow}>
//             <div style={styles.logoIcon}>⚡</div>
//             <span style={styles.logoText}>StruggleTracker</span>
//           </div>
//           <h2 style={styles.title}>Forgot Password?</h2>
//           <p style={styles.sub}>No worries, we'll send you a reset link.</p>
//           <input placeholder="Enter your email" onChange={handleemail} style={styles.input} />
//           <button style={styles.button} onClick={handlereset}>Send Reset Link</button>
//           <p style={styles.link} onClick={() => setIsReset(false)}>← Back to Login</p>
//         </div>
//       </div>
//     );
//   }


//   // LOGIN / SIGNUP SCREEN
//   return (
//     <div style={styles.container}>

//       {/* TOP BRAND BAR */}
//       <div style={styles.topBar}>
//         <div style={styles.logoRow}>
//           <div style={styles.logoIcon}>⚡</div>
//           <span style={styles.logoText}>StruggleTracker</span>
//         </div>
//         <p style={styles.tagline}>Track your struggles. Celebrate your wins.</p>
//       </div>

//       {/* FORM CARD */}
//       <div style={styles.centerBox}>
//         <div style={styles.tabs}>
//           <button style={{ ...styles.tab, ...(isLogin ? styles.tabActive : {}) }} onClick={() => setIsLogin(true)}>Login</button>
//           <button style={{ ...styles.tab, ...(!isLogin ? styles.tabActive : {}) }} onClick={() => setIsLogin(false)}>Sign Up</button>
//         </div>

//         <p style={styles.sub}>{isLogin ? "Welcome back 👋" : "Start your journey today 🚀"}</p>

//         {!isLogin && <input onChange={handlename} placeholder="Full Name" style={styles.input} />}
//         <input onChange={handleemail} placeholder="Email address" style={styles.input} />
//         <input onChange={handlepassword} placeholder="Password" type="password" style={styles.input} />
//         {!isLogin && <input placeholder="Confirm Password" type="password" style={styles.input} />}

//         <button style={styles.button} onClick={isLogin?handlelogin:handlesignup}>{isLogin ? "Login" : "Create Account"}</button>

//         {isLogin && (
//           <p style={styles.link} onClick={() => setIsReset(true)}>Forgot your password?</p>
//         )}
//       </div>

//       {/* BOTTOM STRIP */}
//       <div style={styles.bottomStrip}>
//         <span>🔒 Secure & Private</span>
//         <span>📈 Track Daily Progress</span>
//         <span>🏆 Celebrate Wins</span>
//       </div>

//     </div>
//   );
// }

// export default FirstPage;

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "'Segoe UI', sans-serif",
//     padding: "20px",
//     gap: "24px",
//   },
//   topBar: {
//     textAlign: "center",
//   },
//   logoRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "10px",
//     marginBottom: "6px",
//   },
//   logoIcon: {
//     background: "#6C5CE7",
//     borderRadius: "10px",
//     width: "36px",
//     height: "36px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "18px",
//   },
//   logoText: {
//     fontSize: "24px",
//     fontWeight: "700",
//     color: "white",
//     letterSpacing: "-0.5px",
//   },
//   tagline: {
//     color: "rgba(255,255,255,0.5)",
//     fontSize: "13px",
//     margin: 0,
//   },
//   centerBox: {
//     background: "white",
//     borderRadius: "20px",
//     padding: "36px 32px",
//     width: "100%",
//     maxWidth: "380px",
//     boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//   },
//   title: {
//     fontSize: "20px",
//     fontWeight: "700",
//     color: "#1a1a2e",
//     marginBottom: "6px",
//   },
//   tabs: {
//     display: "flex",
//     background: "#f0f2f5",
//     borderRadius: "10px",
//     padding: "4px",
//     marginBottom: "16px",
//   },
//   tab: {
//     flex: 1,
//     padding: "9px",
//     border: "none",
//     background: "transparent",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "500",
//     color: "#888",
//   },
//   tabActive: {
//     background: "white",
//     color: "#302b63",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//   },
//   sub: {
//     fontSize: "13px",
//     color: "#888",
//     marginBottom: "18px",
//   },
//   input: {
//     width: "100%",
//     padding: "11px 14px",
//     border: "1px solid #e5e7eb",
//     borderRadius: "8px",
//     marginBottom: "12px",
//     fontSize: "14px",
//     outline: "none",
//     boxSizing: "border-box",
//     color: "#1a1a2e",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "linear-gradient(135deg, #6C5CE7, #302b63)",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "600",
//     marginTop: "4px",
//   },
//   link: {
//     marginTop: "14px",
//     cursor: "pointer",
//     color: "#6C5CE7",
//     fontSize: "13px",
//     textAlign: "center",
//   },
//   bottomStrip: {
//     display: "flex",
//     gap: "24px",
//     color: "rgba(255,255,255,0.4)",
//     fontSize: "12px",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
// };