import {
  readFileSync,
  existsSync,
  copyFileSync,
  mkdirSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "assets-to-generate/manifest.json"), "utf8"),
);
const incomingDir = join(root, "assets-to-generate/incoming");
const apply = process.argv.includes("--apply");

let filled = 0;
let missing = 0;
let wired = 0;

console.log("\n📦 Asset status  (objects must be cut-out on pure-black backgrounds)\n");

for (const slot of manifest.slots) {
  const incoming = join(incomingDir, slot.incoming);
  const target = join(root, slot.target);
  const hasIncoming = existsSync(incoming);
  const hasTarget = existsSync(target);
  const newer =
    hasIncoming && hasTarget && statSync(incoming).mtimeMs > statSync(target).mtimeMs;

  if (hasIncoming && apply && (!hasTarget || newer)) {
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(incoming, target);
    console.log(`  ✅ wired   ${slot.id}  → ${slot.target}`);
    wired++;
  } else if (hasTarget) {
    console.log(
      `  ✓ filled   ${slot.id}${newer ? "   (newer file in incoming/ — run --apply)" : ""}`,
    );
    filled++;
  } else if (hasIncoming) {
    console.log(`  ⬇ ready    ${slot.id}   (in incoming/, run --apply to wire in)`);
    missing++;
  } else {
    console.log(`  ○ todo     ${slot.id}${slot.optional ? "   (optional)" : ""}`);
    missing++;
  }
}

console.log(
  `\n  ${filled} filled · ${missing} to go${apply ? ` · ${wired} wired this run` : ""}`,
);
console.log(
  apply
    ? '\nDone. Set each wired slot\'s "status" to "provided" in assets-to-generate/manifest.json, then restart dev.\n'
    : "\nRun `npm run assets:check -- --apply` to copy ready files into the app.\n",
);
