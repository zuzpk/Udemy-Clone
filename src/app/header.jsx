import { oauth } from '@/actions/funs';
import { API_URL, APP_NAME, SESS_KEYS, SESS_PREFIX } from '@/config';
import { useStore } from '@zuzjs/store';
import { AVATAR, Avatar, Box, Button, compare, Cover, css, Icon, Image, Search, Sheet, Size, Spinner, Text, useMounted, withPost } from '@zuzjs/ui';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const Header = (props) => {

    const mounted = useMounted()
    const me = useStore(`user`)
    const [ signOut, setSignout ] = useState(false)
    const toast = useRef()

    const u = useCallback(() => {
        const _me = oauth()
        if ( _me.ID ){
            me.dispatch({ loading: false, ..._me })
            withPost(
                `${API_URL}u/o-auth`,
                {}
            )
            .then(resp => {
                if ( !compare( _me, resp.u ) ){
                    me.dispatch({ loading: false, ...resp.u })
                    Cookies.set(`${SESS_PREFIX}ud`, JSON.stringify(resp.u), { expires: 90 })
                }
            })
            .catch(err => {
                me.dispatch({ loading: false, ID: null })
            })
        }
        else{
            me.dispatch({ loading: false })
            console.log(`not logged in`)
        }
    }, [])

    const signMeOut = () => {
        me.dispatch({ loading: true })
        withPost( `${API_URL}u/signout` )
        .then(resp => {
            me.dispatch({ loading: false, ID: null })
            for( const key in SESS_KEYS ){
                Cookies.remove(`${SESS_PREFIX}${key}`)
            }
            setSignout(false)
            toast.current.success(resp.message || `Signed out successfully`)
        })
        .catch(err => {
            me.dispatch({ loading: false })
            toast.current.error(err.message || `Failed to sign out`)
        })

    }

    useEffect(() => {
        u()
    }, [])

    return (
        <>
        <Box as={[
            `header flex aic p:40,2vw rel zIndex:99 &ph(p:20) h:70 gap:30`,
        ]}>

            <Box as={`logo flex aic flex:1`}>
                <Text as={`s:30 b:900 bgi:gradient-to-right-red-purple text-clip`}>{APP_NAME.toLowerCase()}</Text>
            </Box>

            <Search 
                placeholder={`Search for anything...`}
                as={`p:12!`}
                />


            <Box as={`nav flex aic flex:1 gap:30`}>
                {[
                    { label: `Udemy Business`, href: `/` },
                    { label: `Instructor`, href: `/` },
                    { label: `My Learning`, href: `/` },
                    { icon: `heart`, href: `/` },
                    { icon: `shopping-cart`, href: `/` },
                    { icon: `notification`, href: `/` },
                ].map(n => <Link key={`nav-${(n.label || n.icon).replace(/\s+/g, `-`).toLowerCase()}`} href={n.href} className={css(`tdn s:15 bold white-space-pre`)}>
                    {n.icon ? <Icon name={n.icon} as={`s:24`} /> : n.label}
                </Link>)}
            </Box>

            <Box as={`you flex aic jcc`}>
                <Avatar 
                    src={`/imgs/tmp-dp.jpg`} />
            </Box>
            
        </Box>
        <Sheet ref={toast} />
        </>
    );
}

export default Header;