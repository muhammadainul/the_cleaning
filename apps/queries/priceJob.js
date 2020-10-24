'use strict'

const { isEmpty } = require('lodash')
const debug = require('debug')

exports.create = ({ id, jobType, price, unit }) =>
    new Promise(async(resolve, reject) => {
        console.log('the_cleaning][Query] create')
        try {
            const query = `insert into tbl_pricelistjob (id, jobType, price, unit) values ('${id}', '${jobType}', '${price}', '${unit}')`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                console.log('results', result) 
                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    console.log('row', row)
                    resolve(result)
                })
            }) 
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })