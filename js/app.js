new Vue({
	el: "#app",
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		battlelog: [], 
		gameOver: false,
		actionType: {
			attack: 'attack',
			hurt: 'hurt',
			heal: 'heal'
		}
	},

	computed: {
		playerHealthPercent: function(){
			return this.playerHealth + '%';
		},
		monsterHealthPercent: function(){
			return this.monsterHealth + '%';
		}
	},

	watch: {
		monsterHealth: function(){
			if (this.monsterHealth <= 0) {
				this.monsterHealth = 0;
				this.stopGame();
			}else{
				if (this.monsterHealth === 100) {
					this.clearLog()
				}
			}
		},
		playerHealth: function(){
			if (this.playerHealth <= 0) {
				this.playerHealth = 0;
				this.stopGame();
			}else{
				if (this.playerHealth === 100) {
					this.clearLog();
				}
			}
		}
	},

	methods: {
		newGame: function(){
			location.reload();
		},

		healthSystem: function () {

        },

		playerAttack: function(){
			var playerAttack = Math.floor(Math.random() * 10) + 1;
			this.monsterHealth-=playerAttack;
			this.battlelog.unshift("Player hits: " + playerAttack);
			this.monsterAttack();
		},

		monsterAttack: function(){
			var monsterAttack = Math.floor(Math.random() * 10) + 1;
			this.playerHealth-=monsterAttack;
			this.battlelog.unshift("Monster hits: " + monsterAttack);
		},

		specialAttack: function(){
			var specialAttack = Math.floor(Math.random() * 15) + 10;
			this.monsterHealth-=specialAttack;
			this.battlelog.unshift("Player special hits: " + specialAttack);
			this.monsterAttack();
		},

		heal: function(){
			if(this.playerHealth >= 90){
                this.playerHealth = 100;
				this.battlelog.unshift("Player heals to 100%");
			}else{
				this.playerHealth+=10;
				this.battlelog.unshift("Player heals 10 point");
			}
            this.monsterAttack();
		},

		giveUp: function(){
			this.playerHealth = 0;
			this.battlelog = [];
		},

		stopGame: function(){
			this.gameOver = true;
		},

		clearLog: function(){
			this.battlelog = [];
		}
	}
});