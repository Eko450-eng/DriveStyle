import { TextInput, createStyles, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import db from '../FirebaseConf'

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: 'relative',
    marginTop: "30px"
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'light'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}))


function Cms(){
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

    const form = useForm({
        initialValues:{
            gutachtenTitle: "",
            gutachtenBody: "",
            hagelschadenTitle: "",
            hagelschadenBody: "",
        }
    })

    const changeValue = async(d, t, b) =>{
        const ref = doc(db, d, d)
        await updateDoc(ref, {
            title: t,
            body: b
        })
    }

    const change = (value)=>{
        value.gutachtenTitle !== "" ? changeValue("gutachten", value.gutachtenTitle, value.gutachtenBody) : console.log("Nothing")
        value.hagelschadenTitle !== "" ? changeValue("hagelschaden", value.hagelschadenTitle, value.hagelschadenBody) : console.log("Nothing")
    }

	return <div className="Home-small full-size">
             <form
               style={{
                   display:"flex",
                   flexDirection:"column"
               }}
               onSubmit={form.onSubmit((values) => change(values))}>
               <TextInput
                    label="Gutachten Titel"
                    placeholder="KFZ Gutachten"
                    classNames={classes}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="nope"
                    {...form.getInputProps('gutachtenTitle')}
               />
               <TextInput
                    label="Gutachten Text"
                    placeholder="Gutachten achtet gut"
                    classNames={classes}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="nope"
                    {...form.getInputProps('gutachtenBody')}
               />
               <TextInput
                    label="Hagelschaden Zentrum Titel"
                    placeholder="Zentrum der Hagelschäden"
                    classNames={classes}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="nope"
                    {...form.getInputProps('hagelschadenTitle')}
               />
               <TextInput
                    label="Hagelschaden Text"
                    placeholder="Wir reparieren, nicht verursachen"
                    classNames={classes}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    autoComplete="nope"
                    {...form.getInputProps('hagelschadenBody')}
               />
               <Button
                type="submit"
                 color="green"
                styles={{
                    root:{
                        margin:"20px auto"
                    }
                }}
               >Speichern</Button>
             </form>
		   </div>
}
export default Cms
