class Player extends Character {
    constructor(Hp, atks, name, weakness){
        super(Hp, atks, name, weakness);
        this.HpBar = document.getElementById('player-health');
        document.getElementById('button1').innerText = this.attacks[0].name;
        document.getElementById('button2').innerText = this.attacks[1].name;
        document.getElementById('button3').innerText = this.attacks[2].name;
        document.getElementById('button4').innerText = this.attacks[3].name;
        
        this.attackAnimation = () => {
            document.getElementById('jotaro-img').src= "assets/jotaro-point.png";
            setTimeout(()=>{
                document.getElementById('jotaro-img').src= "assets/Jotaro.gif";
            }, 800)
        };
    }
}