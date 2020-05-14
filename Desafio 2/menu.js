const levels = [
    {
        "name": "Fácil",
        "bombs": "20",
        "width":"10",
        "height":"10",
    },
    {
        "name": "Médio",
        "bombs": "300",
        "width":"30",
        "height":"30",
    },
    {
        "name": "Difícil",
        "bombs": "500",
        "width":"30",
        "height":"40",
    },
]


class Menu {
	constructor(){
        this.body = document.body;

        var menu = document.createElement('div');
        menu.classList.add("menu");

        for(let i=0; i< levels.length; i++){

            var lvl = document.createElement('div');
            lvl.addEventListener("click",()=>{
                menu.style= "display: none;";
                this.playLevel(levels[i]);
            })
            lvl.classList.add("lvl-selector");
            lvl.innerText = levels[i].name;

            menu.appendChild(lvl)
        }

        this.body.appendChild(menu);
    }

    playLevel(level){
        let width = level.width;
        let height = level.height;
        let numberOfBombs = level.bombs;
        new Map(document.getElementById('root'), width, height, numberOfBombs);
    }
}



new Menu();