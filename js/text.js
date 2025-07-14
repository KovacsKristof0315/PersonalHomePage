const text = {
    hu : {
        navbar : ["Kovács Kristóf", "Kő-Papír-Olló", "Todo alkalmazás", "Időjárás"],
        footer : ["&copy; 2025 Kovács Kristóf", "Neptun kód: CVA7DQ",
            `Készült tanulási céllal • <a href="mailto:kovacskristof3315@gmail.com" class="footer-link">Kapcsolat</a>`
        ],
        info : {
            index : {
                title: "Főoldal",
                content: "Ez a személyes weboldalam főoldala, az oldal folyamatos fejlesztés alatt áll"
            },
            rps :{
                title: "Kő papír olló",
                content: "A jól ismert kő-papír-olló egy egyszerű, kézjelekkel játszott döntetlen-kerülő játék, amelyet általában ketten játszanak. Célja, hogy a játékosok egyidejűleg egy-egy jelet mutatva eldöntsék, ki nyer az adott körben."
            },
            todo :
            {
                title: "Todo alkalmazás",
                content: "A todo alkalmazás úgy nevezett localStorage-ba menti az adatokat, ez az adott eszközön tárolódik így más nem láthatja az adott feladatot, és nem törlödik addig ammedig a szerver el nem dobja."
            },
            weather: {
                title: "Időjárás alkalmazás",
                content: `
                    Az időjárás-alkalmazás az adatokat a WeatherAPI ingyenes API-ján keresztül szerzi be. 
                    Mivel az ingyenes lekérések száma korlátozott, egy felhasználó számára napi 30 lekérdezés engedélyezett. 
                    Az adatok pontosságáért felelősséget nem vállalok!
                `
            }
        },
        index :
        {
            title : "Kovács Kristóf",
            subTitles: ["Bemutatkozás", "Érdeklődési kör", "Hobbik", "Ismert technológiák"],
            contents: ["Másodéves programtervező informatikus hallgató vagyok az ELTE-n. Szeretek projekteken dolgozni, és fontosnak tartom a tiszta, átlátható kódot (még ha ez nem is jön össze mindig). 👨‍💻", 
                "Elsősorban C# objektumorientált programozás és webfejlesztés érdekel. Ezen kívül örömömet lelem a (gyakran feleslegesen túltolt) optimalizációban és kódrefaktorizálásban. Szeretek programokat tesztelés nélkül megvalósítani a programozáselméletből ismert levezetési szabályok vagy függvényabsztrakció alapján (még ha ezek a gyakorlatban nem is mindig úgy működnek, mint elméletben).",
                "Futás, edzés, Forma–1 (ezt csak nézem 🤭), új szoftverfejlesztési technológiák kipróbálása.",
                `
                <strong>Programozási nyelvek:</strong> C# (.NET, WinForms, WPF, Avalonia), JavaScript (kis React), PHP, Java (kezdő szinten)<br>
				<strong>Architektúrák:</strong> MV, MVVM
                `
            ]
        },
        rps :
        {
            buttons: ["🪨 Kő", "📄 Papír", "✂️ Olló"],
            titles: ["Válaszok", "Eredmény:"],
            subTitles: ["Te válaszod", "Gép válasza"],
            result : [
                        ["Döntetlen", "Nyertél", "Vesztettél"],
                        ["Vesztettél", "Döntetlen", "Nyertél"],
                        ["Nyertél", "Vesztettél", "Döntetlen"]
                    ]
        },
        todo : 
        {
            titles: ["Új elem hozzáadása", "To-Do lista", "Elvégzett feladatok", "Adatok szerkesztése"],
            inputData:  ["Határidő:", "Elnevezés:", "Előrehaladás"],
            buttons: ["Hozzáad", "Mégse ❌", "Kész ✅", "Szerkesztés ✏️", "Végleges törlés 🗑️"]
        },
        weather :
        {
            title: "Időjárás",
            cityName: "Település:",
            search: "Keresés",
            wind : "Szél (km/h)",
            airQ: "Levegő minőség (μg/m³)",
            description : ["Könnyű eső", "Helyenként felhős", "Felhős", "Napos", "Felhős", "Tiszta", "Elszort esőzés"],
            day : ["Ma", "Holnap", "Holnapután"]
        } 
    },
    en : {
        navbar : ["Kristóf Kovács", "Rock-Paper-scissors", "Todo App", "Weather App"],
        footer : ["&copy; 2025 Kristóf Kovács", "Neptun code: CVA7DQ",
            `Created for learning purposes • <a href="mailto:kovacskristof3315@gmail.com" class="footer-link">Contact</a>`
        ],
        info : {
           index: {
                title: "Main Page",
                content: "This is my personal site. Still a work in progress, so stay tuned!"
            },
            rps: {
                title: "Rock Paper Scissors",
                content: "The well-known game of rock-paper-scissors is a simple hand-gesture-based tie-breaking game, usually played by two people. The goal is for both players to simultaneously show a gesture to determine who wins the round."
            },
            todo: {
                title: "To-Do App",
                content: "The to-do app saves tasks using localStorage, which stores the data on your device. This means no one else can see your tasks, and they remain saved until the browser clears them or storage is manually reset."
            },
            weather: {
                title: "Weather Application",
                content: `
                    The weather application retrieves data using the free WeatherAPI service. 
                    Since the number of free requests is limited, each user is allowed up to 30 queries per day. 
                    I do not take responsibility for the accuracy of the data!
                `    
            }
        }, 
        index :
        {
            title : "Kristóf Kovács",
            subTitles: ["Introduction", "Interests", "Hobbik", "Technologies"],
            contents: [
                "I'm a second-year Computer Science student at ELTE, specializing in software development. I enjoy working on projects and value clean, readable code (even if I don’t always manage to achieve it). 👨‍💻", 
                "I'm primarily interested in object-oriented programming with C# and web development. I also enjoy (often unnecessarily excessive) optimization and code refactoring. I like implementing programs without testing, based on derivation rules or function abstractions known from theoretical computer science (even if these don't always work out as expected in practice).",
                "Running, working out, Formula 1 (just watching 🤭), trying out new software development technologies.",
                `
                <strong>Programming languages:</strong> C# (.NET, WinForms, WPF, Avalonia), JavaScript (some React), PHP, Java (beginner level)<br/>
				<strong>Architectures:</strong> MV, MVVM
                `
            ]
        },
        rps: {
            buttons: ["🪨 Rock", "📄 Paper", "✂️ Scissors"],
            titles: ["Choices", "Result:"],
            subTitles: ["Your choice", "Computer's choice"],
            result : [
                ["Draw", "You won", "You lost"],
                ["You lost", "Draw", "You won"],
                ["You won", "You lost", "Draw"]
            ]
        },
        todo :
        {
            titles: ["Add New Item", "To-Do List", "Completed Tasks", "Edit Data"],
            inputData: ["Deadline:", "Title:", "Progress"],
            buttons: ["Add", "Cancel ❌", "Done ✅", "Edit ✏️", "Permanent Delete 🗑️"]
        },
        weather :
        {
            title: "Weather",
            cityName: "City:",
            search: "Search",
            wind : "Wind (km/h)",
            airQ: "Air quality (μg/m³)",
            description : ["Light rain", "Partly Cloudy", "Overcast", "Sunny", "Cloudy", "Clear", "Patchy rain nearby"],
            day : ["Today", "Tomorrow", "Day after tomorrow"]
        } 
    }
}