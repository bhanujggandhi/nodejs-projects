const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicatesNote = notes.find((note) => note.title === title);

  if (!duplicatesNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.bold("New note added!"));
  } else {
    console.log(chalk.red.bold("Note title taken!"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const leftNotes = notes.filter((note) => {
    return note.title !== title;
  });

  if (leftNotes.length === notes.length) {
    console.log(chalk.red.bold(`Note with title ${title} is not present`));
  } else {
    saveNotes(leftNotes);
    console.log(chalk.green.bold("Note removed!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blueBright.bold("Your notes: -"));
  notes.map((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const FoundNote = notes.find((note) => note.title === title);

  if (FoundNote) {
    console.log(chalk.magenta.inverse.bold(FoundNote.title));
    console.log(FoundNote.body);
  } else {
    console.log(chalk.red.bold("Error: No note found!"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNotes,
  removeNotes,
  listNotes,
  readNotes,
};
