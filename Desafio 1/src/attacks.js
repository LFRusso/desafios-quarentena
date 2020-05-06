/*
  Ataques do jogador e do inimigo
*/

const attacks = {
    theWorld: {
      power: 40,
      accuracy: 100,
      name: 'The World',
      type: 'power',
      effect: {name: 'paralysis', chance: 0.4, time: 2, totalTime: 2, onTrigger: () => {return true}},
      animation: () => {
            document.getElementById('arena').style = "filter: grayscale(50%)";
            setTimeout(()=>{
                document.getElementById('arena').style = "filter: grayscale(00%)"
            }, 1500)
      },
    },
    quickAttack: {
      power: 40,
      accuracy: 100,
      name: 'Quick Attack',
      type: 'physical',
      effect: '',
      animation: () => {
          document.getElementById('starplatinum').src = "assets/starplatinum-quickattack.gif";
          setTimeout(()=> {
            document.getElementById('starplatinum').src = "assets/starplatinum-orara.gif";
          }, 500)
      },
    },
    starFinger: {
      power: 80,
      accuracy: 80,
      name: 'Star Finger',
      type: 'ranged',
      effect: '',
      animation: () => {
        document.getElementById('starplatinum').src = "assets/starplatinum-starfinger.gif";
        setTimeout(()=>{
            document.getElementById('starplatinum').src = "assets/starplatinum-orara.gif"
        }, 800)
      },
    },
    oraOra: {
      power: 110,
      accuracy: 75,
      name: 'Ora Ora',
      type: 'physical',
      effect: '',
      animation: () => {
        document.getElementById('starplatinum').src = "assets/starplatinum-oraora.gif";
        setTimeout(()=>{
            document.getElementById('starplatinum').src = "assets/starplatinum-orara.gif"
        }, 1500)
      },
    },
    mudaMuda: {
      power: 40,
      accuracy: 100,
      name: 'Muda Muda',
      type: 'physical',
      effect: '',
      animation: () => {},
    },
    knifeThrow: {
      power: 45,
      accuracy: 100,
      name: 'Knife Throw',
      type: 'ranged',
      effect: '',
      animation: () => {},
    },
    roadRoller: {
      power: 110,
      accuracy: 80,
      name: 'Road Roller',
      type: 'power',
      effect: '',
      animation: () => {
        document.getElementById("dio-img").style= "visibility: hidden";
        setTimeout(() => {
            document.getElementById("jotaro-img").src= "assets/roadroller.gif";
            document.getElementById("jotaro-img").style= "visibility: hidden";
            document.getElementById("jotaro-img").style= "max-width: 300px; width: 100%";
            document.getElementById("jotaro-img").style= "visibility: show";
            setTimeout(() => {
                document.getElementById("jotaro-img").style= "visibility: hidden";
                document.getElementById("jotaro-img").style= "width: 70px"
                document.getElementById("jotaro-img").src= "assets/Jotaro.gif";
                document.getElementById("jotaro-img").style= "visibility: show";
                document.getElementById("dio-img").style= "visibility: show";
            }, 1000)
        },1000)

      },
    },
};