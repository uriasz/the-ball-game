function Bola(context) {
   this.context = context;
   this.x = 0;
   this.y = 0;
   this.velocidadeX = 0;
   this.velocidadeY = 0;

   // Atributos de desenho padrão
   this.cor = 'black';
   this.raio = 10;

   // Novos atributos para colisão e jogo
   this.congelada = false;
   this.piscar = false;
   this.rosa = false;
   this.cooldown = 0; // timestamp até quando não pode colidir
}
Bola.prototype = {
   atualizar: function() {
      var ctx = this.context;
      if (this.congelada) return;

      if (this.x < this.raio || this.x > ctx.canvas.width - this.raio)
         this.velocidadeX *= -1;

      if (this.y < this.raio || this.y > ctx.canvas.height - this.raio)
         this.velocidadeY *= -1;

      this.x += this.velocidadeX;
      this.y += this.velocidadeY;
   },
   desenhar: function() {
      var ctx = this.context;
      ctx.save();
      // Piscar: alterna entre cor e branco
      if (this.piscar && Math.floor(Date.now() / 150) % 2 === 0) {
         ctx.fillStyle = 'white';
      } else if (this.rosa) {
         ctx.fillStyle = '#FFC0CB'; // rosa bebê
      } else {
         ctx.fillStyle = this.cor;
      }
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.restore();
   },
   // Método para congelar e piscar
   congelarEPiscar: function() {
      this.congelada = true;
      this.piscar = true;
      this.rosa = false;
   },
   liberar: function() {
      this.congelada = false;
      this.piscar = false;
      this.rosa = true;
      this.cooldown = Date.now() + 3000; // 3 segundos de cooldown
   },
   setCorAleatoria: function() {
      var letras = '0123456789ABCDEF';
      var cor = '#';
      for (var i = 0; i < 6; i++) cor += letras[Math.floor(Math.random() * 16)];
      this.cor = cor;
   }
}
