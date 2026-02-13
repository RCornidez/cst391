import { Request, RequestHandler, Response } from 'express';
import { Album } from './albums.model';
import { Track } from '../tracks/tracks.model';
import * as AlbumDao from '../albums/albums.dao';
import * as TracksDao from '../tracks/tracks.dao';
import { OkPacket } from 'mysql';

// readAlbums
export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albums;
        let albumId = parseInt(req.query.albumId as string);

        if(Number.isNaN(albumId)) {
            albums = await AlbumDao.readAlbums();
        } else {
            albums = await AlbumDao.readAlbumsByAlbumId(albumId);
        }

        await readTracks(albums, res);
        
        res.status(200).json(
            albums
        );

    } catch (error) {
        console.error('[albums.controller][readAlbums][Error] ', error);
        res.status(500).json({
            message: "There was an error when fetching albums"
        });
    }
};

// readAlbumsByArtist
export const readAlbumsByArtist = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readAlbumsByArtist(req.params.artist as string);
        await readTracks(albums, res);

        res.status(200).json(
            albums
        );

    } catch (error) {
        console.error('[albums.controller][readAlbumsByArtist][Error] ', error);
        res.status(500).json({
            message: "There was an error when fetching albums"
        });
    }
};

// readAlbumsByArtistSearch
export const readAlbumsByArtistSearch = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readAlbumsByArtistSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch (error) {
        console.error('[albums.controller][readAlbumsByArtistSearch][Error] ', error);
        res.status(500).json({
            message: "There was an error when fetching albums"
        });
    }
};

// readAlbumsByDescriptionSearch
export const readAlbumsByDescriptionSearch = async (req: Request, res: Response) => {
    try {
        const albums = await AlbumDao.readAlbumsByDescriptionSearch('%' + req.params.search + '%');

        await readTracks(albums, res);

        res.status(200).json(
            albums
        );
    } catch (error) {
        console.error('[albums.controller][readAlbumsByDescriptionSearch][Error] ', error);
        res.status(500).json({
            message: "There was an error when fetching albums"
        });
    }  
};

// createAlbum
export const createAlbum = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.createAlbum(req.body);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try {
                await TracksDao.createTrack(track, index, okPacket.insertId);
            } catch (error) {
                console.error('[albums.controller][createAlbum][Error]', error);
                res.status(500).json({
                    message: "There was an error when creating album tracks"
                });
            }
        });

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[albums.controller][createAlbum][Error] ', error);
        res.status(500).json({
            message: "There was an error when creating an album"
        });
    }      
};

// updateAlbum
export const updateAlbum = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await AlbumDao.updateAlbum(req.body);

        req.body.tracks.forEach(async (track: Track, index: number) => {
            try {
                await TracksDao.updateTrack(track);
            } catch (error) {
                console.error('[albums.controller][updateAlbum][Error]', error);
                res.status(500).json({
                    message: "There was an error when updating album tracks"
                });
            }
        });

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[albums.controller][updateAlbum][Error] ', error);
        res.status(500).json({
            message: "There was an error when updating an album"
        });
    }         
};

// deleteAlbum
export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        let albumId = parseInt(req.params.albumId as string);

        if(!Number.isNaN(albumId)) {
            const response = await AlbumDao.deleteAlbum(albumId);

            res.status(200).json(
                response
            );
        } else {
            throw new Error("Integer expected for albumId");
        }
    } catch (error) {
        console.error('[albums.controller][deleteAlbum][Error] ', error);
        res.status(500).json({
            message: "There was an error when deleting an album"
        });
    }       
};

// helper function readTracks
async function readTracks (albums: Album[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < albums.length; i++) {
        try {
            const tracks = await TracksDao.readTracks(albums[i].albumId);
            albums[i].tracks = tracks;
        } catch (error) {
            console.error('[albums.controller][readTracks][Error] ', error);
            res.status(500).json({
                message: "There was an error when fetching album tracks"
            });
        }
    }
};