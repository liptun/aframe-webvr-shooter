AFRAME.registerComponent('explosion', {
  init: function() {
    this.scale = .1;
    this.explosionTexture = document.createElement('a-image');
    this.explosionTexture.setAttribute('src', '#bullet');
    this.el.appendChild(this.explosionTexture);
    let self = this;
    let timer = setTimeout(function(){
      clearTimeout(timer);
      self.el.sceneEl.removeChild(self.el);
    }, 200);
  },
  tick: function() {
    this.scale += 0.05;
    this.explosionTexture.setAttribute('height', this.scale);
    this.explosionTexture.setAttribute('width', this.scale);
    let camPos = document.querySelector('[camera]').object3D.position;
    this.explosionTexture.object3D.lookAt(camPos);
  }
});