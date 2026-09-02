type SourceKind = "meat" | "fish" | "produce";

const strokeProps = {
  fill: "none",
  vectorEffect: "non-scaling-stroke" as const,
};

export function PreparationSequence() {
  return (
    <figure
      className="blueprint-figure preparation-sequence"
      role="img"
      aria-label="Схема подготовки: нож, нарезка и сервировка"
    >
      <svg viewBox="0 0 960 220" role="img" aria-hidden="true" focusable="false">
        <path className="blueprint-construction" d="M36 112H924" {...strokeProps} />
        <path className="blueprint-construction blueprint-dashed" d="M240 34V188M480 34V188M720 34V188" {...strokeProps} />

        <g className="blueprint-primary blueprint-knife">
          <path d="M76 118C122 118 173 103 231 79C246 73 262 71 279 72C260 94 235 111 207 119C158 132 111 132 76 128Z" {...strokeProps} />
          <path d="M75 118L42 113L34 124L76 128" {...strokeProps} />
          <path d="M46 115L43 124M57 116L54 126" {...strokeProps} />
        </g>

        <g className="blueprint-primary blueprint-cuts">
          <path d="M388 146L446 74L576 74L518 146Z" {...strokeProps} />
          <path d="M418 146L476 74M452 146L510 74M486 146L544 74" {...strokeProps} />
          <path className="blueprint-accent" d="M405 162H557" {...strokeProps} />
        </g>

        <g className="blueprint-primary blueprint-service">
          <path d="M682 139H894M711 129C720 86 751 61 788 61C826 61 857 86 866 129" {...strokeProps} />
          <path d="M700 129H877M781 61C781 52 795 52 795 61" {...strokeProps} />
          <path className="blueprint-accent" d="M737 153C768 164 809 164 840 153" {...strokeProps} />
        </g>

        <circle className="blueprint-node" cx="240" cy="112" r="5" />
        <circle className="blueprint-node" cx="480" cy="112" r="5" />
        <circle className="blueprint-node" cx="720" cy="112" r="5" />
        <g className="preparation-mobile-nodes">
          <circle className="blueprint-ring" cx="160" cy="112" r="70" />
          <circle className="blueprint-ring" cx="480" cy="112" r="70" />
          <circle className="blueprint-ring" cx="800" cy="112" r="70" />
        </g>
      </svg>
    </figure>
  );
}

export function WorkdayTrajectory() {
  return (
    <figure className="blueprint-figure workday-trajectory" aria-hidden="true">
      <svg className="workday-desktop-svg" viewBox="0 0 360 700" focusable="false">
        <path
          className="blueprint-construction blueprint-dashed workday-axis"
          d="M40 52V648"
          {...strokeProps}
        />
        <path
          className="blueprint-primary workday-arc"
          d="M40 80A270 270 0 0 1 40 620"
          {...strokeProps}
        />
        <path
          className="blueprint-construction workday-inner-arc"
          d="M40 140A210 210 0 0 1 40 560"
          {...strokeProps}
        />

        <g className="workday-node workday-node-1">
          <circle className="blueprint-ring" cx="190" cy="180" r="34" />
          <circle className="blueprint-node" cx="190" cy="180" r="4" />
          <path className="blueprint-construction" d="M40 180H156M224 180H340" {...strokeProps} />
        </g>
        <g className="workday-node workday-node-2">
          <circle className="blueprint-ring" cx="309" cy="350" r="34" />
          <circle className="blueprint-node" cx="309" cy="350" r="4" />
          <path className="blueprint-construction" d="M40 350H275" {...strokeProps} />
        </g>
        <g className="workday-node workday-node-3">
          <circle className="blueprint-ring" cx="190" cy="520" r="34" />
          <circle className="blueprint-node" cx="190" cy="520" r="4" />
          <path className="blueprint-construction" d="M40 520H156M224 520H340" {...strokeProps} />
        </g>

      </svg>
      <svg className="workday-mobile-svg" viewBox="0 0 80 500" focusable="false">
        <path className="blueprint-primary" d="M40 24V476" {...strokeProps} />
        {[75, 250, 425].map((y) => (
          <g key={y}>
            <circle className="blueprint-ring" cx="40" cy={y} r="27" />
            <circle className="blueprint-node" cx="40" cy={y} r="8" />
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function MenuComposition() {
  return (
    <figure className="blueprint-figure menu-composition" aria-hidden="true">
      <svg viewBox="0 0 720 560" focusable="false">
        <defs>
          <clipPath id="menu-plate-clip">
            <circle cx="360" cy="280" r="117" />
          </clipPath>
        </defs>
        <image
          className="menu-plate-image"
          href="/media/optimized/gallery-dish.webp"
          x="243"
          y="163"
          width="234"
          height="234"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#menu-plate-clip)"
        />
        <path className="blueprint-construction blueprint-dashed menu-crosshair" d="M360 20V540M80 280H640" {...strokeProps} />
        <circle className="blueprint-construction blueprint-dashed" cx="360" cy="280" r="240" {...strokeProps} />
        <circle className="blueprint-primary" cx="360" cy="280" r="202" {...strokeProps} />
        <circle className="blueprint-construction" cx="360" cy="280" r="154" {...strokeProps} />
        <circle className="blueprint-accent" cx="360" cy="280" r="119" {...strokeProps} />

        <path className="blueprint-primary" d="M241 260C270 200 343 176 405 204C446 222 472 262 476 310" {...strokeProps} />
        <path className="blueprint-primary" d="M259 374C308 403 376 405 424 375" {...strokeProps} />
        <path className="blueprint-accent" d="M250 309C279 244 354 215 420 247" {...strokeProps} />

        <path className="blueprint-construction menu-leader" d="M132 116L238 200L274 225" {...strokeProps} />
        <path className="blueprint-construction menu-leader" d="M592 120L486 199L451 224" {...strokeProps} />
        <path className="blueprint-construction menu-leader" d="M598 442L486 368L443 343" {...strokeProps} />
        <circle className="blueprint-node" cx="274" cy="225" r="5" />
        <circle className="blueprint-node" cx="451" cy="224" r="5" />
        <circle className="blueprint-node" cx="443" cy="343" r="5" />

        <path className="blueprint-construction menu-corner-mark" d="M68 68H132M100 36V100M588 460H652M620 428V492" {...strokeProps} />
      </svg>
      <span className="menu-note menu-note-taste">любимые вкусы</span>
      <span className="menu-note menu-note-limits">ограничения</span>
      <span className="menu-note menu-note-result">персональное меню</span>
    </figure>
  );
}

function MeatContour() {
  return (
    <svg viewBox="0 0 520 260" focusable="false">
      <path className="blueprint-primary" d="M42 174C58 121 110 87 181 85C245 83 293 107 310 151C284 194 229 211 159 205C104 201 63 192 42 174Z" {...strokeProps} />
      <path className="blueprint-primary" d="M110 104C101 81 104 57 126 35M151 92C143 69 148 46 170 26M195 86C188 64 195 43 216 26M238 91C235 69 243 52 264 39" {...strokeProps} />
      <path className="blueprint-construction" d="M108 104C132 124 137 174 124 199M151 92C174 119 179 178 164 205M195 86C218 119 223 177 209 204M238 91C260 120 263 169 251 198" {...strokeProps} />
      <path className="blueprint-accent" d="M72 169C131 143 233 141 291 163" {...strokeProps} />
      <path className="blueprint-construction" d="M404 82C431 70 466 78 482 101C455 111 427 109 404 98ZM400 143C428 127 465 135 486 159C459 175 426 171 400 158ZM415 207C438 188 468 190 491 209C470 228 440 228 415 214Z" {...strokeProps} />
      <path className="blueprint-construction blueprint-dashed" d="M392 52V230" {...strokeProps} />
    </svg>
  );
}

function FishContour() {
  return (
    <svg viewBox="0 0 520 260" focusable="false">
      <path className="blueprint-primary" d="M28 132C73 75 165 67 253 113L319 72L306 131L319 191L253 150C163 196 73 187 28 132Z" {...strokeProps} />
      <path className="blueprint-construction" d="M70 132H282M125 91C143 113 143 151 126 174M183 83C205 109 205 155 183 181M239 104C252 122 252 144 239 162" {...strokeProps} />
      <circle className="blueprint-node" cx="69" cy="120" r="4" />
      <path className="blueprint-accent" d="M98 132C142 145 206 145 263 132" {...strokeProps} />
      <path className="blueprint-construction blueprint-dashed" d="M352 50V221" {...strokeProps} />
      <path className="blueprint-construction" d="M374 77C403 58 440 66 459 92C432 110 398 104 374 91ZM374 128C403 109 440 116 459 142C432 160 398 154 374 141ZM374 181C403 162 440 169 459 195C432 213 398 207 374 194Z" {...strokeProps} />
    </svg>
  );
}

function ProduceContour() {
  return (
    <svg viewBox="0 0 520 260" focusable="false">
      <circle className="blueprint-primary" cx="77" cy="139" r="46" {...strokeProps} />
      <path className="blueprint-primary" d="M77 93L65 72M77 93L90 68M77 93L105 83M77 93L49 80M146 203C126 165 134 119 174 88C204 119 201 166 165 201ZM229 205C203 157 218 100 276 73C303 123 282 182 229 205Z" {...strokeProps} />
      <path className="blueprint-construction" d="M147 203C154 159 163 121 174 88M229 205C243 152 260 107 276 73M247 151L220 134M260 119L290 107" {...strokeProps} />
      <path className="blueprint-construction blueprint-dashed" d="M332 48V224" {...strokeProps} />
      <circle className="blueprint-primary" cx="419" cy="136" r="69" {...strokeProps} />
      <path className="blueprint-construction" d="M419 67V205M350 136H488M370 88L468 184M468 88L370 184" {...strokeProps} />
      <path className="blueprint-accent" d="M419 67A69 69 0 0 1 478 171L419 136Z" {...strokeProps} />
    </svg>
  );
}

export function SourceContour({ kind }: { kind: SourceKind }) {
  return (
    <figure className={`blueprint-figure source-contour source-contour-${kind}`} aria-hidden="true">
      {kind === "meat" ? <MeatContour /> : kind === "fish" ? <FishContour /> : <ProduceContour />}
    </figure>
  );
}
