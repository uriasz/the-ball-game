function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
}
Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },
   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      if (!this.ligado) return;
      this.limparTela();

      // Colisão entre bolas
      var agora = Date.now();
      for (var i = 0; i < this.sprites.length; i++) {
         var b1 = this.sprites[i];
         for (var j = i + 1; j < this.sprites.length; j++) {
            var b2 = this.sprites[j];
            // Cooldown: só pode colidir se ambos não estiverem em cooldown
            if (b1.congelada || b2.congelada) continue;
            if (b1.cooldown && b1.cooldown > agora) continue;
            if (b2.cooldown && b2.cooldown > agora) continue;
            var dx = b1.x - b2.x;
            var dy = b1.y - b2.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < b1.raio + b2.raio) {
               // Colisão detectada
               b1.congelarEPiscar();
               b2.congelarEPiscar();
               b1.setCorAleatoria();
               b2.setCorAleatoria();
            }
         }
      }

      // Atualiza e desenha
      for (var i in this.sprites) this.sprites[i].atualizar();
      for (var i in this.sprites) this.sprites[i].desenhar();

      // Verifica objetivo
      var todasRosa = this.sprites.every(function(b){ return b.rosa; });
      if (todasRosa) {
         // Parar todas e piscar
         for (var i in this.sprites) {
            this.sprites[i].congelada = true;
            this.sprites[i].piscar = true;
         }
         this.ligado = false;
         // Exibir botão de reiniciar
         var btn = document.getElementById('btnRestart');
         if (btn) btn.style.display = 'block';
      }

      var animacao = this;
      if (this.ligado) {
         requestAnimationFrame(function() {
            animacao.proximoFrame();
         });
      }
   },
   limparTela: function() {
      var ctx = this.context;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   }
}
