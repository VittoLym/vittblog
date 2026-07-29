<template>
  <div class="absolute inset-0 w-full h-full opacity-60">
    <canvas ref="canvas" style="display:block;width:100%;height:100%"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let gl = null
let animationFrame = null
let mouse = { x: 0, y: 0 }

onMounted(() => {
  const el = canvas.value
  const rect = el.getBoundingClientRect()
  el.width = rect.width || 1280
  el.height = rect.height || 720

  gl = el.getContext('webgl') || el.getContext('experimental-webgl')
  if (!gl) return

  // Vertex Shader
  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

  // Fragment Shader
  const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = uv * 3.0;
    float n = noise(p + u_time * 0.2);
    
    vec3 color1 = vec3(0.055, 0.647, 0.914);
    vec3 color2 = vec3(0.02, 0.1, 0.2);
    vec3 color3 = vec3(0.1, 0.8, 1.0);
    
    float t = u_time * 0.5;
    float w = sin(uv.x * 2.0 + t) * 0.5 + 0.5;
    w += noise(uv * 4.0 - t * 0.3) * 0.3;
    
    vec3 finalColor = mix(color2, color1, w);
    finalColor = mix(finalColor, color3, noise(uv * 10.0 + t) * 0.2);
    
    float scanline = sin(uv.y * 200.0) * 0.02;
    finalColor += scanline;
    
    float vignette = 1.0 - length(uv - 0.5) * 0.5;
    finalColor *= vignette;
    
    gl_FragColor = vec4(finalColor, 1.0);
}`

  const createShader = (type, src) => {
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }

  const prog = gl.createProgram()
  gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs))
  gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(prog, 'a_position')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const uTime = gl.getUniformLocation(prog, 'u_time')
  const uRes = gl.getUniformLocation(prog, 'u_resolution')
  const uMouse = gl.getUniformLocation(prog, 'u_mouse')

  // Mouse tracking
  const handleMouseMove = (event) => {
    const rect = el.getBoundingClientRect()
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width
      const ny = 1.0 - (event.clientY - rect.top) / rect.height
      mouse.x = nx * el.width
      mouse.y = ny * el.height
    }
  }
  window.addEventListener('mousemove', handleMouseMove)

  const render = (t) => {
    gl.viewport(0, 0, el.width, el.height)
    if (uTime) gl.uniform1f(uTime, t * 0.001)
    if (uRes) gl.uniform2f(uRes, el.width, el.height)
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animationFrame = requestAnimationFrame(render)
  }

  render(0)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    if (animationFrame) cancelAnimationFrame(animationFrame)
  })
})
</script>