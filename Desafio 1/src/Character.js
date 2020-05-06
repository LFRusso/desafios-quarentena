class Character {
    constructor(Hp, atks, name, weakness){
        this.name = name
        this.weakness = weakness;
        this.attacks = atks;
        this.totalHp = Hp;
        this.Hp = Hp;
        this.HpBar = document.getElementById('opponent-health');

        this.effects = [];
        this.sprite = "assets/DIO.gif";
        this.animation = "assets/DIO.gif";

        this.attackAnimation = () => {
            document.getElementById('opponent-effect').style= "display: inline";
            document.getElementById('dio-img').src= this.animation;
            setTimeout(()=>{
                document.getElementById('opponent-effect').style= "display: none;";
                document.getElementById('dio-img').src= this.sprite;
            }, 1300)
        };
    }
    
    updateHp(damage){
        // Prevents the HP to go lower than 0
        this.Hp = Math.max(this.Hp - damage, 0);

        // Update the hp bar
        const barWidth = (this.Hp / this.totalHp) * 100;
        this.HpBar.style.width = barWidth + '%';
    }
}