document.addEventListener("DOMContentLoaded", () => {
    // --- 1. OPENING CREDITS INTERACTION ---
    const openingCredits = document.getElementById("opening-credits");
    const rainAudio = document.getElementById("sfx-rain");
    const pagesAudio = document.getElementById("sfx-pages");
    const coffeeAudio = document.getElementById("sfx-coffee");

    if (openingCredits) {
        openingCredits.addEventListener("click", () => {
            openingCredits.classList.add("fade-out");
            if (rainAudio) {
                rainAudio.volume = 0.4;
                rainAudio.play().catch(e => console.log("Audio play blocked:", e));
            }
        });
    }

    // --- 2. ROOM HOTSPOTS & MODALS ---
    const speakerHotspot = document.getElementById("hotspot-speaker");
    const musicModal = document.getElementById("music-modal");
    const closeMusicBtn = document.querySelector(".close-music-btn");
    const bookHotspot = document.getElementById("hotspot-book");
    const poemModal = document.getElementById("poem-modal");
    const closePoemBtn = document.querySelector("#poem-modal .close-btn");
    const coffeeHotspot = document.getElementById("hotspot-coffee");
    const lampHotspot = document.getElementById("hotspot-lamp");
    const paintingHotspot = document.getElementById("hotspot-painting");
    const paintingModal = document.getElementById("painting-modal");
    const closePaintingBtn = document.querySelector(".close-painting-btn");
    const skyHotspot = document.getElementById("hotspot-sky");
    const dontClickBtn = document.getElementById("dont-click-btn");
    const finalDoor = document.getElementById("final-door");
    const finalScreen = document.getElementById("final-screen");
    const finalText = document.getElementById("final-text");
    const beforeLeaveAudio = document.getElementById("audio-before-leave");

    if (speakerHotspot && musicModal) {
        speakerHotspot.addEventListener("click", () => { musicModal.classList.remove("hidden"); });
    }
    if (closeMusicBtn && musicModal) {
        closeMusicBtn.addEventListener("click", () => { musicModal.classList.add("hidden"); });
    }
    if (bookHotspot && poemModal) {
        bookHotspot.addEventListener("click", () => {
            poemModal.classList.remove("hidden");
            if (pagesAudio) {
                pagesAudio.currentTime = 0;
                pagesAudio.play().catch(e => {});
            }
        });
    }
    if (closePoemBtn && poemModal) {
        closePoemBtn.addEventListener("click", () => { poemModal.classList.add("hidden"); });
    }
    if (coffeeHotspot) {
        coffeeHotspot.addEventListener("click", () => {
            if (coffeeAudio) {
                coffeeAudio.currentTime = 0;
                coffeeAudio.play().catch(e => {});
            }
            setTimeout(() => {
                alert("The sharp, warm aroma of freshly poured filter coffee fills the room. Take a breath.");
            }, 500); 
        });
    }
    if (lampHotspot) {
        lampHotspot.addEventListener("click", () => { document.body.classList.toggle("lights-out"); });
    }
    if (paintingHotspot && paintingModal) {
        paintingHotspot.addEventListener("click", () => { paintingModal.classList.remove("hidden"); });
    }
    if (closePaintingBtn && paintingModal) {
        closePaintingBtn.addEventListener("click", () => { paintingModal.classList.add("hidden"); });
    }

    window.addEventListener('click', (e) => {
        if (e.target === poemModal) poemModal.classList.add('hidden');
        if (e.target === musicModal) musicModal.classList.add('hidden');
        if (e.target === paintingModal) paintingModal.classList.add('hidden');
    });

    // --- 3. 5-SONG COZY CHAPTER PLAYER LOGIC ---
    const audioTracks = {
        sundari: document.getElementById('audio-sundari'),
        enadhuyire: document.getElementById('audio-enadhuyire'),
        kurukuru: document.getElementById('audio-kurukuru'),
        rathinamo: document.getElementById('audio-rathinamo'),
        something: document.getElementById('audio-something')
    };

    const songTitles = {
        sundari: "Playing: Sundari: A Habit of Us",
        enadhuyire: "Playing: Enadhuyire: Safe in Your Arms",
        kurukuru: "Playing: Kuru Kuru: Those Quiet Glances",
        rathinamo: "Playing: Rathinamo: Close to My Heart",
        something: "Playing: Something Abt You, Madhu Maa"
    };

    window.playChapter = function(songKey, event) {
        for (let key in audioTracks) {
            if (audioTracks[key]) {
                audioTracks[key].pause();
                audioTracks[key].currentTime = 0;
            }
        }
        if (audioTracks[songKey]) {
            audioTracks[songKey].play().catch(error => console.log("Audio restricted:", error));
        }
        const tabs = document.querySelectorAll('.chapter-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        if (event && event.currentTarget) event.currentTarget.classList.add('active');

        const label = document.getElementById('now-playing-label');
        if (label && songTitles[songKey]) {
            label.innerText = songTitles[songKey];
            label.style.color = "#d4af37";
        }
    };

    // --- 4. PERPETUAL BIRTHDAY COUNTER ---
    const timeLeftDisplay = document.getElementById('time-left');
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let nextBday = new Date(currentYear, 4, 23, 0, 0, 0); 
        if (now.getTime() > nextBday.getTime()) nextBday.setFullYear(currentYear + 1);
        const diff = nextBday.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (timeLeftDisplay) timeLeftDisplay.innerText = `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }
    if (timeLeftDisplay) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // --- 5. EASTER EGGS ---
    const secretBtn = document.getElementById('dont-click-btn');
    let clickCount = 0;
    if (secretBtn) {
        secretBtn.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) secretBtn.innerText = "I knew you would.";
            else if (clickCount === 2) secretBtn.innerText = "Okay, since you're already here…";
            else if (clickCount === 3) { secretBtn.innerText = "Thank you for being one of the easiest people to talk to."; secretBtn.style.color = "#d4af37"; }
            else if (clickCount === 4) secretBtn.style.display = "none"; 
        });
    }
    if (skyHotspot) {
        skyHotspot.addEventListener('click', () => { alert("batman 🦇 will be there for you"); });
    }

    // --- 6. THE FINAL LETTER SEQUENCE (WITH SUNDARI AUDIO BACKGROUND) ---
    // EXACT lines from your screenshots
    const letterLines = [
        "I used to think movies exaggerated how it feels to find someone who just gets you.",
        "But then we started talking.",
        "The 3 AM texts... the old melodies... the way my chaotic mind just goes completely quiet when I'm with you.",
        "Enakku eppadi solradhu nu therila...",
        "But every single day, I catch myself waiting for your name to pop up on my screen.",
        "You've unknowingly become my safe place.",
        "So, I wanted to build one for you.",
        "Whenever the world gets too heavy, or you just need to breathe...",
        "Inge vandhudu.",
        "I'll keep the coffee warm. And I'll always be right here.",
        "— your 🦇 man"
    ];

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    if (finalDoor && finalScreen && finalText && beforeLeaveAudio) {
        finalDoor.addEventListener('click', async () => {
            
            // 1. Pause any background music from the room
            for (let key in audioTracks) {
                if (audioTracks[key]) audioTracks[key].pause();
            }
            if (rainAudio) rainAudio.pause();
            
            // 2. Show the black screen
            finalScreen.classList.remove('hidden');
            setTimeout(() => finalScreen.classList.add('active'), 50); 
            
            // 3. START THE SUNDARI AUDIO (The true fix)
            beforeLeaveAudio.currentTime = 0;
            beforeLeaveAudio.play().catch(e => console.log("Audio play blocked", e));

            await sleep(2500); 

            // 4. Play the letter lines over the music exactly as you designed
            for (let i = 0; i < letterLines.length; i++) {
                finalText.innerText = letterLines[i];
                finalText.style.opacity = 1; 
                
                let displayTime = (i === letterLines.length - 1) ? 5000 : 3000;
                await sleep(displayTime); 
                
                if (i < letterLines.length - 1) {
                    finalText.style.opacity = 0; 
                    await sleep(1500); 
                }
            }
        });
    }
});