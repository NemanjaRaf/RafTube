const Playlist = require("../models/Playlist")

const PlaylistService = new Object()

PlaylistService.createPlaylist = async (data) => {
    const playlist = new Playlist({
        title: data.body.title,
        description: data.body.description,
        author: data.user._id,
    })

    await playlist.save()

    return await Playlist.find({ author: data.user._id }).populate("author")
}

PlaylistService.updatePlaylist = async (id, data) => {
   const playlist = await Playlist.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })

    if (!playlist) {
         throw new Error("Playlist not found")
    }

    return playlist
}

PlaylistService.deletePlaylist = async (id) => {
    const playlist = await Playlist.findByIdAndDelete(id)

    if (!playlist) {
        throw new Error("Playlist not found")
    }

    return true
}

PlaylistService.listAll = async () => {
    return await Playlist.find().populate("author")
}

PlaylistService.getPlaylist = async (id) => {
    
    return await Playlist.findById(id).populate("author").populate({
        path: "videos",
        populate: {
            path: "channel",
            model: "User",
        },
    })
}

PlaylistService.addVideo = async (id, videoId) => {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
        throw new Error("Playlist not found")
    }

    if (playlist.videos.includes(videoId)) {
        throw new Error("Video already in playlist")
    }

    playlist.videos.push(videoId)
    await playlist.save()
}

PlaylistService.removeVideo = async (id, videoId) => {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
        throw new Error("Playlist not found")
    }

    if (!playlist.videos.includes(videoId)) {
        throw new Error("Video not in playlist")
    }

    playlist.videos.pull(videoId)
    await playlist.save()
}

PlaylistService.follow = async (id, userId) => {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
        throw new Error("Playlist not found")
    }

    if (playlist.followers.includes(userId)) {
        throw new Error("Playlist already followed")
    }

    playlist.followers.push(userId)
    await playlist.save()
}

PlaylistService.unfollow = async (id, userId) => {
    const playlist = await Playlist.findById(id)

    if (!playlist) {
        throw new Error("Playlist not found")
    }

    if (!playlist.followers.includes(userId)) {
        throw new Error("Playlist not followed")
    }

    playlist.followers.pull(userId)
    await playlist.save()
}

PlaylistService.listPlaylists = async (id) => {
    const playlistsByAuthor = await Playlist.find({ author: id }).populate("author").populate('videos')
    const playlistsByFollower = await Playlist.find({ followers: id }).populate("author").populate('videos')
    return { playlistsByAuthor, playlistsByFollower }
}

PlaylistService.listFollowedPlaylists = async (id) => {
    return await Playlist.find({ followers: id }).populate("author")
}

module.exports = PlaylistService