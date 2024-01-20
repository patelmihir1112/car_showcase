"use client";
import React from 'react'
import { SearchManufacturer } from './'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SearchBar = () => {

    const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
        <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
            <Image
                src="/magnifying-glass.svg"
                alt="magnifying glass"
                width={40}
                height={40}
                className='object-contain'
            />
        </button>
    )

    const [manufacturer, setManuFacturer] = useState("");
    const [model, setModel] = useState("");
    const router = useRouter();


    const handleSearch = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === "" && model === "") {
            alert('Please enter either a manufacturer or a model');
        }

        updateSearchParams(model.toLocaleLowerCase(), manufacturer.toLocaleLowerCase())
    }
    const updateSearchParams = (model: string, manufacturer: string)=>{
        const SearchParams = new URLSearchParams(window.location.search);

        if (model) {
            SearchParams.set('model', model);
        } else {
            SearchParams.delete('model')
        }


        if (manufacturer) {
            SearchParams.set('manufacturer', manufacturer);
        } else {
            SearchParams.delete('manufacturer')
        }

        const newPathname = `${window.location.pathname}?${SearchParams.toString()}`
        router.push(newPathname,{ scroll: false });
    }
    return (
        <form className='searchbar'
            onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer manufacturer={manufacturer} setManuFacturer={setManuFacturer} />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className='searchbar__item'>
                <Image
                    src="/model-icon.png"
                    alt="car model"
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                />
                <input
                    type='text'
                    name='model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='X7'
                    className='searchbar__input'></input>
                <SearchButton otherClasses="sm:hidden" />

            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar