import {Request, Response} from "express";
import User from '../models/User';
import Joi, {ValidationError} from 'joi';
import bcrypt from 'bcrypt';
import {passwords as passwordsConfig} from '../../config/index';
import {
    AnchorMode, broadcastTransaction,
    getAddressFromPrivateKey,
    makeRandomPrivKey,
    makeSTXTokenTransfer,
    privateKeyToString,
    TransactionVersion
} from '@stacks/transactions';
import {StacksTestnet} from '@stacks/network';
import BigNum from 'bn.js';

declare module 'express-session' {
    interface SessionData {
        user: number
    }
}

export const createUser = async function (req: Request, res: Response) {
    const schema = Joi.object({
        username: Joi.string()
            .min(1)
            .max(16)
            .required(),
        password: Joi.string()
            .min(1)
            .max(50)
            .regex(/[a-zA-Z0-9 `~!@#$%^&*()\-_+=[\]{};:'"<>,./?\\]+/)
            .required()
    });

    try {
        const {username, password} = await schema.validateAsync(req.body);

        const existingUser = await User.findOne({
            where: {
                username
            }
        });
        if (existingUser) {
            return res.status(400).send({message: 'An account with that username already exists.'})
        }
        const privateKey = makeRandomPrivKey();


        const user = await User.create({
            username,
            password: await bcrypt.hash(password, passwordsConfig.saltRounds),
            privateKey: privateKeyToString(privateKey),
            address: getAddressFromPrivateKey(privateKeyToString(privateKey), TransactionVersion.Testnet)
        });

        return res.status(201).send(user);
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).send({message: (err as ValidationError).message});
        }
        return res.status(500).send({message: 'An error has occurred on the server.'})
    }
}

export const login = async function (req: Request, res: Response) {
    if (req.session.user) {
        const user = await User.findOne({
            where: {
                id: req.session.user
            }
        });
        return res.status(200).send(user);
    }

    const schema = Joi.object({
        username: Joi.string()
            .min(1)
            .max(16)
            .required(),
        password: Joi.string()
            .min(1)
            .max(50)
            .regex(/[a-zA-Z0-9 `~!@#$%^&*()\-_+=[\]{};:'"<>,./?\\]+/)
            .required()
    });

    try {
        const {username, password} = await schema.validateAsync(req.body);

        const user: User = await User.scope('withPassword').findOne({
            where: {
                username
            }
        });
        if (!user) {
            return res.status(401).send({message: 'Invalid username or password.'})
        }

        const matches = await bcrypt.compare(password, user.password);
        if (!matches) {
            return res.status(401).send({message: 'Invalid username or password.'})
        }

        req.session.user = user.id;
        return res.status(200).send(user);
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).send({message: (err as ValidationError).message});
        }
        console.error(err);
        return res.status(500).send({message: 'An error has occurred on the server.'})
    }
}

export const getUserByAddress = async function (req: Request, res: Response) {
    const user = await User.findOne({
        where: {
            address: req.params.address
        }
    });
    if(user) {
        return res.status(200).send(user);
    }
    return res.status(404).send({message: 'No user with that address found'});
}

export const transfer  = async function (req: Request, res: Response) {

    console.log(req.body);
    console.log(`ID: ${req.session.user}`)


    const senderUser = await User.findOne({
        where: {
            id: req.session.user
        }
    });
    const receiverUser = await User.findOne({
        where: {
            address: req.body.address
        }
    });


    console.log(`Sender ${senderUser.username}`);
    console.log(`Receiver ${receiverUser.username}`);

    const network = new StacksTestnet();

    const transaction = await makeSTXTokenTransfer({
        recipient: req.body.address,
        amount: parseInt(req.body.amount),
        senderKey: senderUser.privateKey,
        network: network,
        memo: 'test memo',
        anchorMode: AnchorMode.Any,
        nonce: new BigNum(parseInt(req.body.nonce) + 1)
    });

    console.log(`Transaction: ${toJson(transaction)}`);

    const broadcastResponse = await broadcastTransaction(transaction, network);

    console.log(`BoardcastResponse:" ${toJson(broadcastResponse)}`);

    function toJson(data) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a);
    }

    return res.status(200).send(receiverUser);
}