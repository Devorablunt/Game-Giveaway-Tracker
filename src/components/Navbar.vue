<template>
    <div class="primary-header flex">
        <a class="logo">Game Giveaway Tracker</a>

        <button class="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
            <span class="sr-only">Menu</span>
        </button>

        <nav>
            <ul id="primary-navigation" data-visible="false" class="primary-navigation flex">
                <li>
                    <a class="nav-item" href="#/">HOME</a>
                </li>
                <li>
                    <a class="nav-item" href="#/giveaways">GIVEAWAYS</a>
                </li>
                <li
                    ><a class="nav-item" href="#/calendar">CALENDAR</a>
                </li>
                <li>
                    <LogIn></LogIn>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import LogIn from "./LogIn.vue"
    export default {
        props: [],
        data() {
            return {
            };
        },
        methods: {
        },
        components: { LogIn },
        mounted() {
            const primaryNav = document.querySelector(".primary-navigation");
            const navToggle = document.querySelector(".mobile-nav-toggle");

            navToggle.addEventListener('click', () => {
                const visibility = primaryNav.getAttribute("data-visible");
                if (visibility == "false") {
                    primaryNav.setAttribute("data-visible", true);
                    navToggle.setAttribute("aria-expanded", true);
                } else if (visibility == "true") {
                    primaryNav.setAttribute("data-visible", false);
                    navToggle.setAttribute("aria-expanded", false);
                }
            });
  
        }   
    }  
</script>

<style>
    /* Raisin Black = #2C2C34 
    Dark Liver = #494850
    Turquoise Green = #A9D8B8
    Cambridge Blue = #A7C4B5
    Cadet Grey = #9AA0A8 */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
    }
    .logo {
        margin: 1rem;
        font-weight: bold;
        font-size: 24px;
        font-family: 'Orbitron';
        text-transform: uppercase;
        color: #007EA7;
        /* background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent; */
    }
    .primary-header {
        /* margin-top: 1rem; */
        align-items: center;
        justify-content: space-between;
        background-color: #121212;
    }
    .mobile-nav-toggle {
        display: none;
    }
    .primary-navigation {
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #121212;
        /* background: hsl(0 0% 0% / 0.6);
        backdrop-filter: blur(0.2rem); */
    }
    .primary-navigation a {
        text-decoration: none;
        color: white;
    }
    .nav-item:hover {
        text-decoration: underline;
        text-decoration-thickness: 3px;
        text-decoration-color: white;
    }      
    .primary-navigation a.active {
        text-decoration: underline;
        text-decoration-thickness: 3px;
        text-decoration-color: white;
    }  
    @media (max-width: 50em) { 
        .primary-navigation {
            --gap: 2em;

            position: fixed;
            z-index: 1000;
            inset: 0 0 0 30%;

            flex-direction: column;
            padding: min(30vh, 10rem) 2em;

            transform: translateX(100%);
            transition: transform 350ms ease-out;
        }

        .primary-navigation[data-visible="true"] {
            transform: translateX(0%);
        }

        .mobile-nav-toggle {
            display: block;
            position: absolute;
            z-index: 9998;
            background-color: transparent;
            background-image: url("../assets/icons/Hamburger_icon.png");
            background-size: cover;
            background-repeat: no-repeat;
            width: 2rem;
            aspect-ratio: 1;
            border: 0;
            top: 2rem;
            right: 2rem;
        }

        .mobile-nav-toggle[aria-expanded="true"] {
            background-image: url("../assets/icons/Hamburger_close_icon.png");            
        }
    }

    @media (min-width: 50em) {
        .primary-navigation {
            --gap: 3rem;
            padding-block: 2rem;
            padding-inline: clamp(3rem, 5vw,10rem);
        }
    }

    .flex {
        display: flex;
        gap: var(--gap, 1rem);
    }
</style>