    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";

    import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBiXg97zCbgfaHglRZgADbxmkK3knsZBLY",
      authDomain: "login-98e6c.firebaseapp.com",
      projectId: "login-98e6c",
      storageBucket: "login-98e6c.appspot.com",
      messagingSenderId: "1019152837362",
      appId: "1:1019152837362:web:9e960033980b9faa2dbe6b",
      measurementId: "G-GHY5WYQ4D2"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const signInButton = document.getElementById("login");

    const userSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
    
            const name = user.displayName;
            const imgsrc = user.photoURL;
            const email = user.email;
    
            // Set cookies
            document.cookie = `name=${encodeURIComponent(name)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
            document.cookie = `imgsrc=${encodeURIComponent(imgsrc)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
            document.cookie = `email=${encodeURIComponent(email)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
            alert("Logged In Successfully!");
            window.location.href = 'home.html';
        } catch (error) {
            console.error("Error signing in:", error.code, error.message);
        }
    };
    

    signInButton.addEventListener("click", userSignIn)


    function getCookies() {
        const cookies = document.cookie.split('; ');
    
        const cookieValues = {};
    
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            cookieValues[name] = decodeURIComponent(value);
        });
    
        const name = cookieValues.name || '';
        const imgsrc = cookieValues.imgsrc || '';
        const email = cookieValues.email || '';
    
        return { name, imgsrc, email };
    }
    
    // Example usage:
    const { name, imgsrc, email } = getCookies();
    
    console.log('Name:', name);
    console.log('Image Source:', imgsrc);
    console.log('Email:', email);

    if (name && imgsrc && email) {
        // Set properties only if name, imgsrc, and email exist
        pfp.src = `${imgsrc}`;
        pfp.style.borderRadius = '50%';
        pfp.style.width = '45%';
        pfp.style.objectFit = 'cover';
        pfp.style.display = 'block';
        pfp.style.margin = 'auto';
        pfp.style.marginRight = '-0.3rem';
    
        if(msg){
            msg.innerHTML = `Hi ${name}, Good Morning!`;
        }else{
            console.log("")
        }
    }