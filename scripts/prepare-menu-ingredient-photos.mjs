// Encode responsive copies only. Subject cropping stays editable in the UI.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const root = 'design/references/menu-ingredients-2026-09-13';
const output = 'public/media/menu/book';
for (const name of ['garlic', 'olive-oil', 'lemon', 'salt', 'spices']) {
  for (const width of [640, 960]) {
    await sharp(`${root}/${name}.jpg`).resize({ width }).webp({ quality: 88 }).toFile(`${output}/ingredient-${name}-${width}.webp`);
  }
}

const configurations = [
  { name: 'basil', photoSize: [179, 391], photoRect: [0, 0, 179, 391], path: 'M0 0H179V391H0Z' },
  { name: 'garlic', photoSize: [1280, 960], photoRect: [554, 515, 216, 236], path: 'M554 650C568 616 603 578 640 550C667 530 704 515 724 519C741 533 756 560 765 590C773 621 760 656 745 680C722 715 681 747 651 748C620 742 586 719 568 687Z' },
  { name: 'olive-oil', photoSize: [1260, 840], photoRect: [109, 224, 819, 552], path: 'M245 350C245 279 404 228 565 225C743 224 904 278 925 344C933 393 903 454 876 479C861 542 816 622 754 654C696 679 615 683 556 678C568 716 544 751 508 767C471 783 431 778 407 759C370 773 332 770 304 752C266 774 220 779 187 760C155 741 145 707 161 678C139 676 118 655 111 627C100 590 117 559 145 544C170 526 205 522 228 532C236 510 257 492 285 484C270 444 245 391 245 350Z' },
  { name: 'lemon', photoSize: [1200, 848], photoRect: [599, 354, 459, 450], path: 'M807 355C913 344 1017 415 1046 514C1075 614 1042 715 949 773C877 818 758 810 685 756C605 697 583 596 610 514C639 426 717 369 807 355Z' },
  { name: 'salt', photoSize: [960, 794], photoRect: [165, 130, 588, 593], path: 'M465 133C515 132 547 149 572 177C613 184 643 218 669 250C705 279 719 313 725 348C748 384 750 424 745 460C759 503 736 545 711 572C698 615 656 663 613 688C575 722 533 721 499 705C448 705 403 684 367 657C329 639 293 608 279 574C242 550 220 507 211 475C181 450 166 414 177 380C169 342 182 306 210 284C222 245 252 217 286 204C317 175 357 171 391 164C417 144 442 142 465 133Z' },
  { name: 'spices', photoSize: [1024, 768], photoRect: [264, 115, 423, 333], path: 'M435 143C456 127 482 112 511 116L547 121L563 132L584 133C609 151 624 180 629 215L627 258C654 280 677 310 684 341C689 363 671 389 655 411C632 437 604 449 582 444L549 440C522 451 495 441 476 423L462 396C439 407 420 412 399 411C364 410 333 394 305 373C286 350 271 320 265 291L270 259C290 224 315 205 333 184L352 158L379 139L410 137Z' },
];

const records = configurations.map(({ name, photoSize, photoRect, path }) => {
  const [x, y, width, height] = photoRect;
  const basil = name === 'basil';
  return {
    name,
    photoSrc: basil ? '/media/menu/exploded/basil.webp' : `/media/menu/book/ingredient-${name}-640.webp`,
    photoLargeSrc: basil ? '/media/menu/exploded/basil.webp' : `/media/menu/book/ingredient-${name}-960.webp`,
    photoWidths: basil ? [179, 179] : [640, 960],
    photoSize, photoRect,
    clipPath: path,
    clipTransform: `scale(${1 / width} ${1 / height}) translate(${-x} ${-y})`,
  };
});
await writeFile('app/menu-book-ingredients.json', JSON.stringify(records, null, 2) + '\n');
console.log('Encoded 10 responsive photographs; wrote 6 ingredient display crops.');
