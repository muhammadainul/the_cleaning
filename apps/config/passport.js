'use strict'

const { isEmpty } = require('lodash')
const localStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        console.log('seriaLizeUser', user)
        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        console.log('deserializeUser', id)
        try {
            let user = await conn.query(`SELECT * FROM tbl_userLocal WHERE id='${id}'`, (err, result) => {
                if (err) return err

                if(!isEmpty(result)) {
                    console.log('user', result)
                    return done(null, result)
                } else {
                    return done(null, false)
                }
            })
        } catch (error) {
            throw error
        }
    })

    passport.use('login', new localStrategy( async (username, password, done) => {
        try {
            let user = await conn.query(`SELECT * FROM tbl_userLocal WHERE username='${username}' AND password='${password}'`, (err, result) => {
                if (err) return err

                if (!isEmpty(result)) {
                    console.log('localStrategy', result)
                    return done(null, result)
                } else {
                    return done(null, false)
                }
            })
            console.log('user', user)
        } catch (error) {
            throw error
        }
    }))
    
    passport.use(
        new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "topSecret!"
        },
        (async (jwtPayload, done) => {
            console.log('jwtPassport', { jwtPayload })
            try {
               return done(null, jwtPayload)
            } catch (error) {
                done(error)
            }
        }) 
    ))
}