const mongoose = require('mongoose');

const usersData = require('./users.json')
const playlistsData = require('./playlists.json')
const songsData = require('./songs.json')


main().catch(err => console.log(err));
const close = () => mongoose.connection.close()

//Define models and schemas
const User = mongoose.model('User', mongoose.Schema({
  _id: Number,
  name: String,
}, { versionKey: false }));

const Song = mongoose.model('Song', mongoose.Schema({
  id: Number,
  artist: String,
  title: String,
}, { versionKey: false }));

const Playlist = mongoose.model('Playlist', mongoose.Schema({
  _id: Number,
  owner_id: Number,
  song_ids: Array,
}, { versionKey: false }));

async function main() {
  //DB Connection
  await mongoose.connect('mongodb://localhost:27017/test');

  //Drop Databases
  await mongoose.connection.dropDatabase();


  //Create User instances
  await User.create([
    {
      _id: "1",
      name: "Albin Jaye"
    },
    {
      _id: "2",
      name: "Dipika Crescentia"
    },
    {
      _id: "3",
      name: "Ankit Sacnite"
    },
    {
      _id: "4",
      name: "Galenos Neville"
    },
    {
      _id: "5",
      name: "Loviise Nagib"
    },
    {
      _id: "6",
      name: "Ryo Daiki"
    },
    {
      _id: "7",
      name: "Seyyit Nedim"
    }
  ]);

  //Create Playlist instances
  await Playlist.create([
    {
      _id: "1",
      owner_id: "2",
      song_ids: [
        "8",
        "32"
      ]
    },
    {
      _id: "2",
      owner_id: "3",
      song_ids: [
        "6",
        "8",
        "11"
      ]
    },
    {
      _id: "3",
      owner_id: "7",
      song_ids: [
        "7",
        "12",
        "13",
        "16",
        "2"
      ]
    }
  ]);

  //Create Song instances
  await Song.create([
    {
      id: "1",
      artist: "Camila Cabello",
      title: "Never Be the Same"
    },
    {
      id: "2",
      artist: "Zedd",
      title: "The Middle"
    },
    {
      id: "3",
      artist: "The Weeknd",
      title: "Pray For Me"
    },
    {
      id: "4",
      artist: "Drake",
      title: "God's Plan"
    },
    {
      id: "5",
      artist: "Bebe Rexha",
      title: "Meant to Be"
    },
    {
      id: "6",
      artist: "Imagine Dragons",
      title: "Whatever It Takes"
    },
    {
      id: "7",
      artist: "Maroon 5",
      title: "Wait"
    },
    {
      id: "8",
      artist: "Bazzi",
      title: "Mine"
    },
    {
      id: "9",
      artist: "Marshmello",
      title: "FRIENDS"
    },
    {
      id: "10",
      artist: "Dua Lipa",
      title: "New Rules"
    },
    {
      id: "11",
      artist: "Shawn Mendes",
      title: "In My Blood"
    },
    {
      id: "12",
      artist: "Post Malone",
      title: "Psycho"
    },
    {
      id: "13",
      artist: "Ariana Grande",
      title: "No Tears Left To Cry"
    },
    {
      id: "14",
      artist: "Bruno Mars",
      title: "Finesse"
    },
    {
      id: "15",
      artist: "Kendrick Lamar",
      title: "All The Stars"
    },
    {
      id: "16",
      artist: "G-Eazy",
      title: "Him & I"
    },
    {
      id: "17",
      artist: "Lauv",
      title: "I Like Me Better"
    },
    {
      id: "18",
      artist: "NF",
      title: "Let You Down"
    },
    {
      id: "19",
      artist: "Dua Lipa",
      title: "IDGAF"
    },
    {
      id: "20",
      artist: "Taylor Swift",
      title: "Delicate"
    },
    {
      id: "21",
      artist: "Calvin Harris",
      title: "One Kiss"
    },
    {
      id: "22",
      artist: "Ed Sheeran",
      title: "Perfect"
    },
    {
      id: "23",
      artist: "Meghan Trainor",
      title: "No Excuses"
    },
    {
      id: "24",
      artist: "Niall Horan",
      title: "On The Loose"
    },
    {
      id: "25",
      artist: "Halsey",
      title: "Alone"
    },
    {
      id: "26",
      artist: "Charlie Puth",
      title: "Done For Me"
    },
    {
      id: "27",
      artist: "Foster The People",
      title: "Sit Next to Me"
    },
    {
      id: "28",
      artist: "Max",
      title: "Lights Down Low"
    },
    {
      id: "29",
      artist: "Alice Merton",
      title: "No Roots"
    },
    {
      id: "30",
      artist: "5 Seconds Of Summer",
      title: "Want You Back"
    },
    {
      id: "31",
      artist: "Camila Cabello",
      title: "Havana"
    },
    {
      id: "32",
      artist: "Logic",
      title: "Everyday"
    },
    {
      id: "33",
      artist: "Drake",
      title: "Nice For What"
    },
    {
      id: "34",
      artist: "Halsey",
      title: "Bad At Love"
    },
    {
      id: "35",
      artist: "ZAYN",
      title: "Let Me"
    },
    {
      id: "36",
      artist: "Khalid",
      title: "Love Lies"
    },
    {
      id: "37",
      artist: "Post Malone",
      title: "rockstar"
    },
    {
      id: "38",
      artist: "Rudimental",
      title: "These Days"
    },
    {
      id: "39",
      artist: "Liam Payne",
      title: "Familiar"
    },
    {
      id: "40",
      artist: "Imagine Dragons",
      title: "Thunder"
    }
  ]);
  const findAllUsers = await User.find();
  const findAllPlaylists = await Playlist.find();
  const findAllSongs = await Song.find();
}

//Add Song
const addSong = (song) => {
  Song.create(song).then(() => {
    console.info('New Song Added')
    close()
  })
}

//Find Song
const findSong = async (name) => {
  //Make case insensitive
  const search = new RegExp(name, 'i')
  //Find song
  Song.find({ title: search }).then(song => {
    console.log(song)
    return song
  })
}

//Remove Playlists
const removePlaylist = (num) => {
  Playlist.findOneAndRemove(num).then(() => {
    console.info(`Playlist removed`)
  })
}


  module.exports = {
    addSong,
    findSong,
    removePlaylist
  }
