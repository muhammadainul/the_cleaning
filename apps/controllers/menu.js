'use strict'

const { isEmpty } = require('lodash')
const { validationResult } = require('express-validator')
const debug = require('debug')
const Puid = require('puid')
const { toInt } = require('validator').default
const Menu = require('../queries/menu')

async function addMenu (req, res) {
    let log = debug('the_cleaning:menu:addMenu')
    let data = req.body
    log('[the_cleaning][menu] addMenu', data)
    try {
        const { menu } = req.body

        const exists = await Menu.isExistsByName(menu)
        log('exists', exists)
        if (!isEmpty(exists)) return res.send({ statusCode: 400, message: 'Menu already available.' })

        let uniqid
        uniqid = new Puid()

        const created = await Menu.create({ id: uniqid.generate(), menu })
        log('created', created)

        return res.send({ statusCode: 200, message: 'Menu has been successfully added.', body: created })
    } catch (error) {
        throw error
    }
}

async function editMenu (req, res) {
    let log = debug('the_cleaning:menu:editMenu')
    let data = req.body
    log('[the_cleaning][menu] editMenu', data)
    try {
        const { id, menu } = req.body

        const exists = await Menu.findById(id)
        log('exists', exists)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Menu not found." })

        const edited = await Menu.updateById({ id, menu })
        log('edited', edited)

        return res.send({ statusCode: 200, message: 'Menu has been successfully edited.', body: edited})
    } catch (error) {
        throw error
    }
}

async function deleteMenu (req, res) {
    let log = debug('the_cleaning:menu:deleteMenu')
    let data = req.body
    log('[the_cleaning][menu] deleteMenu', data)
    try {
        const { id } = req.body

        const exists = await Menu.findById(id)
        log('exists', exists)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Menu not found." })

        const deleted = await Menu.deleteById(id)
        log('deleted', deleted)

        return res.send({ statusCode: 200, message: 'Menu has been successfully deleted.', body: deleted })
    } catch (error) {
        throw error
    }
}

async function getMenuById (req, res) {
    let log = debug('the_cleaning:menu:getMenuById')
    let data = req.body
    log('[the_cleaning][menu] getMenuById', data)
    try {
        const { id } = req.body

        const exists = await Menu.findById(id)
        log('exists', exists)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Menu not found." })

        return res.send({ statusCode: 200, data: exists })
    } catch (error) {
        throw error
    }
}

async function getAllMenu (req, res) {
    let log = debug('the_cleaning:menu:getAllMenu')
    let data = req.body
    log('[the_cleaning][menu] getAllMenu', data)
    try {
        const { start, length, draw } = req.body
        const offset = toInt(start)
        const numOfItems = toInt(length)

        const result = await Menu.findAll()
        log('result', result)
        if (isEmpty(result)) {
            return res.send({ 
                statusCode: 200,
                body: {
                    recordsFiltered: 0,
                    recordsTotal: 0,
                    data: [],
                    draw
                }
            })
        }

        const data = result
            .slice(offset, offset + numOfItems)
            .map(result => {
                const { id, ...menuList } = result
                return {
                    id,
                    ...menuList
                }
            })

        return res.send({ 
            statusCode: 200, 
            body: {
                recordsFiltered: data.length,
                recordsTotal: data.length,
                data: data,
                draw
            } 
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    addMenu, 
    editMenu, 
    deleteMenu,
    getMenuById,
    getAllMenu
}