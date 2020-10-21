import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2';
import pool from '../lib/db'
import { Item } from '../interface/item'
import { parseLanguage } from '../lib/helper';


export async function getTopic(req: Request, res: Response): Promise<Response> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT  id, " +
        "name " +
        "FROM " +
        "topic " +
        "WHERE " +
        "id = ?;", [req.params.typeId]);
    return res.json(rows);
}

export async function addTopic(req: Request, res: Response): Promise<Response> {
    await pool.query('INSERT INTO topic SET ?', [req.body]);
    return res.json({
        message: 'New Topic Created'
    });
}

export async function getTopics(language?: string): Promise<RowDataPacket[]> {
    let languages = parseLanguage(language);
    let sql = "SELECT  id, " +
        "name " +
        "FROM " +
        "topic " +
        "WHERE ( language LIKE ? ";
    for (let i = 1; i < languages.length; i++) {
        sql += "OR language LIKE ? ";
    }
    sql += ');';

    const [rows] = await pool.query<RowDataPacket[]>(sql, languages);
    return rows;
}

export async function deleteTopic(req: Request, res: Response): Promise<Response> {
    const id = req.params.topicId;
    await pool.query('DELETE FROM topic WHERE topic.id = ?', [id]);
    return res.json({
        message: 'Topic deleted'
    });
}

export async function updateTopic(req: Request, res: Response): Promise<Response> {
    const id = req.params.topicId;
    const updateItem: Item = req.body;
    await pool.query('UPDATE topic SET ? WHERE id = ?', [updateItem, id]);
    return res.json({
        message: 'Topic Updated'
    });
}