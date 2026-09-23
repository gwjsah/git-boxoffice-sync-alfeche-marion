# WORKFLOW.md — Box Office Sync

**Name:** Marion Rey D. Alfeche

---

## Screenshot Evidence

![Task 1 — Clone A discount committed and pushed](screenshots/Screenshot%20(7409).png)

![Task 2 — Clone B push rejected](screenshots/Screenshot%20(7410).png)

![Task 3 — Clone B merge resolved, tests run, pushed](screenshots/Screenshot%20(7411).png)

![Task 4 — Clone C push rejected](screenshots/Screenshot%20(7412).png)

![Task 5 — Clone C three-way merge resolved, tests run, pushed](screenshots/Screenshot%20(7413).png)

![Task 6 — Clone A rebase resolved, pushed without force](screenshots/Screenshot%20(7415).png)

![Task 7 — Merged into main, tagged v1.0-synced, pushed](screenshots/Screenshot%20(7416).png)

---

## Question 1: Walk through the final calculateTicketPrice function and name which contributor's change is responsible for each part.

```js
function calculateTicketPrice(quantity, basePrice, isVIP) {
  let total = quantity * basePrice;
  if (quantity >= 5) {
    total = total * 0.9; // 10% group discount
  }
  if (isVIP) {
    total = total * 1.5; // 50% VIP surcharge for premium seating
  }
  total = total - 10; // flat $10 discount off any order
  return Math.round(total);
}
```

- `let total = quantity * basePrice;` — this was already in the starter code.
- The 10% group discount — added by me, Clone A, Task 1.
- The VIP surcharge — added by me, Clone C, Task 4.
- The flat $10 discount — added by me, Clone A, Task 6.
- `Math.round` instead of `Math.floor` — added by me, Clone B, Task 2.

Git could not decide the **order** of these steps on its own. I chose to apply the discount and surcharge first, then subtract $10, then round at the end. A different order would give a different final price.

---

## Question 2: Compare Task 3's two-way conflict to Task 5's three-way conflict — what got harder with a third line of work?

Task 3 only had two changes to combine: the group discount and the rounding fix. It was easy to see how to combine them.

Task 5 had three changes: discount, rounding, and VIP surcharge. This was harder because:

- There were more ways to order the changes, and each order gave a different price.
- The conflict text was longer and covered the whole function, so it took more time to read and understand both sides.
- It was easier to miss one of the three changes by accident. With two changes, it's easy to check both are there. With three, it's easier to lose track of one.

---

## Question 3: Task 6's flat $10 discount changed the expected result of tests unrelated to your change (the group-discount and VIP tests). Why, and what does that tell you about "isolated" changes in shared code?

The test checks the price for 3 tickets at $15.50. This order is not a group order and not a VIP order, so it looks unrelated to those features.

But the test still broke. It broke first because Task 2 changed `Math.floor` to `Math.round`. It broke again after Task 6 added the flat $10 discount.

This happened because all these changes share the same function. Every order, big or small, VIP or not, goes through the same `calculateTicketPrice` function and the same final line. So a change to that line affects every order, even ones the change was not meant for.

The lesson: a change is not truly "isolated" just because you meant it for one feature. If the code is shared, the change can affect every other feature that uses the same code. This is why it's important to run the full test suite after every change, not just check the one feature you were working on.

---

## Question 4: If this were a real team of three, what one process change would have prevented all three rejected pushes?

**Fetch before you start working, not just before you push.**

All three rejections happened for the same reason: each person started editing an old copy of the branch and did not check if it had changed. If everyone ran `git fetch` (and checked `git status`) before starting new work, they would see right away that someone else had already pushed changes. This would not stop conflicts from happening, but it would let the team expect them and plan ahead, instead of being surprised by a rejected push after already doing the work.
