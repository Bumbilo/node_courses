const { Console } = require("console");
const express = require("express");
const router = express.Router();
var fs = require("fs");

const Counter = require("../data/counter_number");

router.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  if (Counter[bookId] !== undefined) {
    res.json(Counter[bookId]);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:bookId/incr", (req, res) => {
  const { bookId } = req.params;
  if (Counter[bookId] !== undefined) {
    Counter[bookId] += 1;
    writeCounterToFile(Counter);
  } else {
    Counter[bookId] = 0;
    writeCounterToFile(Counter);
  }

  res.json(Counter[bookId]);
});

function writeCounterToFile(object) {
  try {
    fs.writeFileSync("./data/counter_number.json", JSON.stringify(object));
    
  } catch (error) {
    console.error('error', error);
  }
}

module.exports = router;
