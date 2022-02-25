const program = require('commander')
const {prompt} = require('inquirer')

const {
  addSong,
  findSong,
  removePlaylist
} = require('./index')


//Customer questions
const songAddQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'Song Title'
  },
  {
    type: 'input',
    name: 'artist',
    message: 'Song Artist'
  },
]

const songFindQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'Song Title'
  },
]

const findPlaylistQuestions = [
  {
    type: 'list',
    choices: ['2', '3', '7'],
    name: 'owner_id',
    message: 'Owner id of playlist'
  },
]
program
  .version('1.0.0')
  .description('Client Management System')

program
  .command('add')
  .alias('a')
  .description('Add a song')
  .action(() => {
    prompt(songAddQuestions).then(answers => addSong(answers))
  })

program
  .command('find <name>')
  .alias('f')
  .description('Find a song')
  .action(name => findSong(name))


program
  .command('delete')
  .alias('d')
  .description('Delete playlist')
  .action(() => {
    prompt(findPlaylistQuestions).then(answers => removePlaylist(answers))
  })

program.parse(process.argv)
