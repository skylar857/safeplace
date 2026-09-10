document.addEventListener("DOMContentLoaded", () => {
    // --- 1. OPENING CREDITS INTERACTION ---
    const openingCredits = document.getElementById("opening-credits");
    const rainAudio = document.getElementById("sfx-rain");
    const pagesAudio = document.getElementById("sfx-pages");
    const coffeeAudio = document.getElementById("sfx-coffee");

    if (openingCredits) {
        openingCredits.addEventListener("click", () => {
            openingCredits.classList.add("fade-out");
            // Start ambient rain sound on entry
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

    // Music Modal Open/Close
    if (speakerHotspot && musicModal) {
        speakerHotspot.addEventListener("click", () => {
            musicModal.classList.remove("hidden");
        });
    }
    if (closeMusicBtn && musicModal) {
        closeMusicBtn.addEventListener("click", () => {
            musicModal.classList.add("hidden");
        });
    }

    // Book Modal Open/Close (with paper sound)
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
        closePoemBtn.addEventListener("click", () => {
            poemModal.classList.add("hidden");
        });
    }

    // Coffee Hotspot SFX & Alert
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

    // Lamp Toggle (Lights out / cozy dark mode)
    if (lampHotspot) {
        lampHotspot.addEventListener("click", () => {
            document.body.classList.toggle("lights-out");
        });
    }

    // Painting Modal Open/Close
    if (paintingHotspot && paintingModal) {
        paintingHotspot.addEventListener("click", () => {
            paintingModal.classList.remove("hidden");
        });
    }
    if (closePaintingBtn && paintingModal) {
        closePaintingBtn.addEventListener("click", () => {
            paintingModal.classList.add("hidden");
        });
    }

    // Close modals if clicking outside content background
    window.addEventListener('click', (e) => {
        if (e.target === poemModal) {
            poemModal.classList.add('hidden');
        }
        if (e.target === musicModal) {
            musicModal.classList.add('hidden');
        }
        if (e.target === paintingModal) { 
            paintingModal.classList.add('hidden');
        }
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
        // Pause and reset all tracks immediately
        for (let key in audioTracks) {
            if (audioTracks[key]) {
                audioTracks[key].pause();
                audioTracks[key].currentTime = 0;
            }
        }

        // Play the selected track safely
        if (audioTracks[songKey]) {
            audioTracks[songKey].play().catch(error => {
                console.log("Audio autoplay restricted:", error);
            });
        }

        // Update active UI tab states
        const tabs = document.querySelectorAll('.chapter-tab');
        tabs.forEach(tab => tab.classList.remove('active'));

        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }

        // Update active player label text smoothly
        const label = document.getElementById('now-playing-label');
        if (label && songTitles[songKey]) {
            label.innerText = songTitles[songKey];
            label.style.color = "#d4af37";
        }
    };

    // --- 4. PERPETUAL BIRTHDAY COUNTER (May 23rd) ---
    const timeLeftDisplay = document.getElementById('time-left');

    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        let nextBday = new Date(currentYear, 4, 23, 0, 0, 0); // Month 4 is May

        if (now.getTime() > nextBday.getTime()) {
            nextBday.setFullYear(currentYear + 1);
        }

        const diff = nextBday.getTime() - now.getTime();

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        if (timeLeftDisplay) {
            timeLeftDisplay.innerText = `${days}d ${h}h ${m}m ${s}s`;
        }
    }

    if (timeLeftDisplay) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // --- 5. EASTER EGGS & SECRET BUTTON ---
    const secretBtn = document.getElementById('dont-click-btn');
    let clickCount = 0;

    if (secretBtn) {
        secretBtn.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) {
                secretBtn.innerText = "I knew you would.";
            } else if (clickCount === 2) {
                secretBtn.innerText = "Okay, since you're already here…";
            } else if (clickCount === 3) {
                secretBtn.innerText = "Thank you for being one of the easiest people to talk to.";
                secretBtn.style.color = "#d4af37"; 
            } else if (clickCount === 4) {
                secretBtn.style.display = "none"; 
            }
        });
    }

    // Bat-Signal Easter Egg
    if (skyHotspot) {
        skyHotspot.addEventListener('click', () => {
            alert("batman 🦇 will be there for you");
        });
    }

    // --- 6. BEFORE YOU LEAVE CINEMATIC LYRIC OVERLAY ---
    const beforeLeaveOverlay = document.getElementById("before-leave-overlay");
    const beforeLeaveAudio = document.getElementById("audio-before-leave");
    const blLines = document.querySelectorAll(".bl-line");

    if (finalDoor && beforeLeaveOverlay && beforeLeaveAudio) {
        
        // Dynamically applying styles so the overlay looks perfectly cinematic 
        beforeLeaveOverlay.style.opacity = '0';
        beforeLeaveOverlay.style.transition = 'opacity 2s ease';
        beforeLeaveOverlay.style.position = 'fixed';
        beforeLeaveOverlay.style.top = '0';
        beforeLeaveOverlay.style.left = '0';
        beforeLeaveOverlay.style.width = '100vw';
        beforeLeaveOverlay.style.height = '100vh';
        beforeLeaveOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        beforeLeaveOverlay.style.zIndex = '9999';
        beforeLeaveOverlay.style.display = 'flex';
        beforeLeaveOverlay.style.flexDirection = 'column';
        beforeLeaveOverlay.style.justifyContent = 'center';
        beforeLeaveOverlay.style.alignItems = 'center';
        
        blLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            line.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
            line.style.color = '#fff';
            line.style.fontSize = '1.4rem';
            line.style.fontStyle = 'italic';
            line.style.margin = '15px 0';
            line.style.letterSpacing = '1px';
        });

        // Ensure it doesn't block clicks when hidden
        beforeLeaveOverlay.style.pointerEvents = 'none';

        finalDoor.addEventListener('click', () => {
            // 1. Pause any chapter music currently playing
            for (let key in audioTracks) {
                if (audioTracks[key]) {
                    audioTracks[key].pause();
                }
            }
            
            // 2. Unhide the overlay and fade it in
            beforeLeaveOverlay.classList.remove('hidden');
            beforeLeaveOverlay.style.pointerEvents = 'auto';
            
            setTimeout(() => {
                beforeLeaveOverlay.style.opacity = '1';
                
                // 3. Play the dedicated Sundari track
                beforeLeaveAudio.currentTime = 0;
                beforeLeaveAudio.play().catch(e => console.log("Audio play blocked", e));
                
                // 4. Reveal lyrics sequentially based on data-delay
                blLines.forEach(line => {
                    const delay = parseInt(line.getAttribute('data-delay') || '0', 10);
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, delay);
                });
            }, 50);

            // 5. Fade gently back to the cozy room once the audio ends
            beforeLeaveAudio.onended = () => {
                beforeLeaveOverlay.style.opacity = '0';
                beforeLeaveOverlay.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    beforeLeaveOverlay.classList.add('hidden');
                    
                    // Reset lyric styles so it works perfectly if clicked again
                    blLines.forEach(line => {
                        line.style.opacity = '0';
                        line.style.transform = 'translateY(20px)';
                    });
                }, 2000); // Wait for the 2-second fade-out
            };
        });
    }
});