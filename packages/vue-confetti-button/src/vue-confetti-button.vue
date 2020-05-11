<script>
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import { nanoid } from "nanoid";

export default {
  name: "VueConfettiButton", // vue component name
  props: {
    id: {
      type: String
    },
    variant: {
      type: String
    }
  },
  data() {
    return {
      nanoid: nanoid(),
      bounding: null
    };
  },
  computed: {
    uid() {
      return !this.id ? this.nanoid : `${this.id}-${this.nanoid}`;
    }
  },
  mounted() {
    const button = document.querySelector(`#button-${this.uid}`);
    const bounding = button.getBoundingClientRect();
    this.bounding = bounding;
    this.emitter = confetti.create(button.querySelector(`#canvas-${this.uid}`));
  },
  methods: {
    click(e) {
      const button = document.querySelector(`#button-${this.uid}`);
      button.classList.add("success");
      gsap.to(button, {
        "--icon-x": -3,
        "--icon-y": 3,
        "--z-before": 0,
        duration: 0.2,
        onComplete: () => {
          this.emitter({
            spread: 200,
            decay: 0.6,
            angle: 95,
            origin: {
              x: 0,
              y: 1
            },
            particleCount: 100,
            ticks: 50,
            shapes: ["circle"]
          });
          gsap.to(button, {
            "--icon-x": 0,
            "--icon-y": 0,
            "--z-before": -6,
            duration: 1,
            ease: "elastic.out(1, .5)",
            onComplete() {
              button.classList.remove("success");
            }
          });
        }
      });
    },
    mouseMove(e) {
      const button = document.querySelector(`#button-${this.uid}`);

      let dy = (e.clientY - this.bounding.top - this.bounding.height / 2) / -1;
      let dx = (e.clientX - this.bounding.left - this.bounding.width / 2) / 10;

      dy = dy > 10 ? 10 : dy < -10 ? -10 : dy;
      dx = dx > 4 ? 4 : dx < -4 ? -4 : dx;

      button.style.setProperty("--rx", dy);
      button.style.setProperty("--ry", dx);
    },
    mouseLeave(e) {
      const button = document.querySelector(`#button-${this.uid}`);
      button.style.setProperty("--rx", 0);
      button.style.setProperty("--ry", 0);
    }
  }
};
</script>

<template>
  <button
    class="button"
    :class="{ white: variant === 'white', grey: variant === 'grey' }"
    :id="`button-${uid}`"
    @click="click"
    @mouseleave="mouseLeave"
    @mousemove="mouseMove"
  >
    <div class="icon">
      <slot name="cannon">
        <div class="cannon"></div>
      </slot>
      <div class="confetti">
        <slot name="confetti">
          <svg viewBox="0 0 18 16">
            <polyline points="1 10 4 7 4 5 6 1" />
            <path
              d="M4,13 C5.33333333,9 7,7 9,7 C11,7 12.3340042,6 13.0020125,4"
            />
            <path
              d="M6,15 C7.83362334,13.6666667 9.83362334,12.6666667 12,12 C14.1663767,11.3333333 15.8330433,9.66666667 17,7"
            />
          </svg>
          <i></i><i></i><i></i><i></i><i></i><i></i>
        </slot>
        <canvas :id="`canvas-${uid}`" class="emitter"></canvas>
      </div>
    </div>
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.button {
  --background: #1e2235;
  --color: #f6f8ff;
  --shadow: #{rgba(#00093d, 0.24)};
  --cannon-dark: #a6accd;
  --cannon-light: #f6f8ff;
  --cannon-shadow: #{rgba(#0d0f18, 0.9)};
  --confetti-1: #892ab8;
  --confetti-2: #ea4c89;
  --confetti-3: #ffff04;
  --confetti-4: #4af2fd;
  --z-before: -6;
  display: block;
  outline: none;
  cursor: pointer;
  position: relative;
  border: 0;
  background: none;
  padding: 9px 22px 9px 16px;
  line-height: 26px;
  font-family: inherit;
  font-weight: 600;
  font-size: 14px;
  color: var(--color);
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform var(--transform-duration, 0.4s);
  will-change: transform;
  transform-style: preserve-3d;
  transform: perspective(440px) rotateX(calc(var(--rx, 0) * 1deg))
    rotateY(calc(var(--ry, 0) * 1deg)) translateZ(0);
  &:hover {
    --transform-duration: 0.16s;
  }
  &.success {
    --confetti-scale: 0;
    --stroke-dashoffset: 15;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    transform: translateZ(calc(var(--z-before) * 1px));
    background: var(--background);
    box-shadow: 0 4px 8px var(--shadow);
  }
  .icon,
  span {
    display: inline-block;
    vertical-align: top;
    position: relative;
    z-index: 1;
  }
  .icon {
    --z: 2px;
    width: 24px;
    height: 14px;
    margin: 8px 16px 0 0;
    transform: translate(
        calc(var(--icon-x, 0) * 1px),
        calc(var(--icon-y, 0) * 1px)
      )
      translateZ(2px);
    .confetti {
      position: absolute;
      left: 17px;
      bottom: 9px;
      svg {
        width: 18px;
        height: 16px;
        display: block;
        stroke-width: 1px;
        fill: none;
        stroke-linejoin: round;
        stroke-linecap: round;
        * {
          transition: stroke-dashoffset 0.2s;
          stroke-dasharray: 15 20;
          stroke-dashoffset: var(--stroke-dashoffset, 0);
          stroke: var(--stroke-all, var(--stroke, var(--confetti-2)));
          &:nth-child(2) {
            --stroke: var(--confetti-3);
          }
          &:nth-child(3) {
            --stroke: var(--confetti-1);
          }
        }
      }
      .emitter {
        position: absolute;
        left: 4px;
        bottom: 4px;
        pointer-events: none;
        div {
          width: 4px;
          height: 4px;
          margin: -2px 0 0 -2px;
          border-radius: 1px;
          position: absolute;
          left: 0;
          top: 0;
          transform-style: preserve-3d;
          background: var(--confetti-all, var(--b, none));
        }
      }
      i {
        width: 4px;
        height: 4px;
        display: block;
        transform: scale(var(--confetti-scale, 0.5));
        position: absolute;
        transition: transform 0.25s;
        left: var(--left, -1px);
        top: var(--top, 3px);
        border-radius: var(--border-radius, 1px);
        background: var(--confetti-background, var(--confetti-3));
        &:nth-child(2) {
          --left: 9px;
          --top: -1px;
          --border-radius: 2px;
          --confetti-background: var(--confetti-4);
        }
        &:nth-child(3) {
          --left: 5px;
          --top: 3px;
          --confetti-background: var(--confetti-1);
        }
        &:nth-child(4) {
          --left: 10px;
          --top: 14px;
          --confetti-background: var(--confetti-2);
        }
        &:nth-child(5) {
          --left: 9px;
          --top: 7px;
          --confetti-background: var(--confetti-4);
        }
        &:nth-child(6) {
          --left: 6px;
          --top: 8px;
          --border-radius: 2px;
          --confetti-background: var(--confetti-2);
        }
      }
    }
    .cannon {
      position: relative;
      width: 24px;
      height: 14px;
      transform: translate(0, 3px) rotate(-45deg);
      filter: drop-shadow(-2px 2px 2px var(--cannon-shadow));
      &:before,
      &:after {
        content: "";
        display: block;
        height: 14px;
      }
      &:before {
        background: linear-gradient(
          var(--cannon-dark),
          var(--cannon-light) 50%,
          var(--cannon-dark)
        );
        width: 100%;
        -webkit-clip-path: polygon(25px -1px, 0 52%, 25px 15px);
        clip-path: polygon(25px -1px, 0 52%, 25px 15px);
      }
      &:after {
        width: 6px;
        position: absolute;
        right: -3px;
        top: 0;
        border-radius: 50%;
        box-shadow: inset 0 0 0 0.5px var(--cannon-light);
        background: linear-gradient(
          90deg,
          var(--cannon-dark),
          var(--cannon-light)
        );
      }
    }
  }
  &.white {
    --background: #fff;
    --color: #1e2235;
    --border: #e1e6f9;
    --shadow: none;
    --cannon-dark: #103fc5;
    --cannon-light: #275efe;
    --cannon-shadow: #{rgba(#00093d, 0.2)};
    &:before {
      box-shadow: inset 0 0 0 1px var(--border);
    }
  }
  &.grey {
    --background: #404660;
    --cannon-shadow: #{rgba(#0d0f18, 0.2)};
    --cannon-dark: #d1d6ee;
    --cannon-light: #ffffff;
  }
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
  &:before,
  &:after {
    box-sizing: inherit;
  }
}
</style>
