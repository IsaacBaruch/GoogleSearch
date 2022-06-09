
import React, { useState, useRef, useEffect } from 'react';
import { translate } from '../lang';

const MAX_ROWS = 10;

const AutoComplete = (props) => {
    let { id, placeholder, onSearch, onRemove, history } = props || { };
    
    const view = useRef(null);
    const input = useRef(null);
    useEffect(() => { input.current.focus(); }, []);
    const [term, setTerm] = useState('');
    const [showList, setShowList] = useState(false);
    const [ignoreBlur, setIgnoreBlur] = useState(false);

    const onSearchTerm = (value) => {
        onSearch && onSearch(value);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (term !== undefined && term !== '') {
                onSearchTerm(term);
                setShowList(false);
            }
        }
    }

    const onChange = (e) => {
        setTerm(e.target.value);
        setShowList(true);
    }
    
    const onClear = (e) => {
        setTerm('');
        setShowList(true);
        input.current.value = '';
        input.current.focus();
    }

    const onMouseDown = (e) => {
        if (view && view.current.contains(e.target)) {
            setIgnoreBlur(true)
            if (!showList) {
                setShowList(true);
            }
        } else {
            setIgnoreBlur(false)
        }
    }

    const onFocus = (e) => {
        setShowList(true);
        setIgnoreBlur(false);
    }
    
    const onBlur = (e) => {
        if (!ignoreBlur) {
            setShowList(false);
        }
        setIgnoreBlur(false);
    }
    
    const onSelectItem = (item) => {
        setShowList(false);
        setTerm(item.title);
        onSearchTerm(item.title);
        input.current.value = item.title;
    }

    const onRemoveItem = (item, e) => {
        e.stopPropagation();
        onRemove && onRemove(item);
    }

    let isListVisible = showList;
    let recentList = null;
    if (showList) {
        // remove spaces
        let termSearch = term.trim().replace(/\s\s+/g, ' ');
        if (termSearch.length && termSearch[termSearch.length-1] === `\\`) {
            termSearch += ` `;
        }
        var pattern = new RegExp(termSearch.toLocaleLowerCase());
        let searchList = history.filter(item => pattern.test(item.title.toLocaleLowerCase()));
        searchList.sort(sortByRecent);
        if (searchList.length > MAX_ROWS) {
            searchList = searchList.slice(0,MAX_ROWS);
        }

        let rows = searchList.map(item => {
            let { title, lastSearch } = item;
            return (<li key={title} className='flx-row' data-recent={Boolean(lastSearch)} onClick={onSelectItem.bind(this, item)}>
                <div className='icon'/>
                <label>{ title }</label>
                <label className='clickable' onClick={onRemoveItem.bind(this, item)}>{translate('remove')}</label>
                </li>)
        });

        if (rows.length) {
            recentList = <ul className='recent-list flx-col'>{rows}</ul>
        }
        isListVisible = searchList.length > 0;
    }

    let clearButton = null;
    if (term.length) {
        clearButton = (<svg className='clear clickable' viewBox='0 0 24 24' width={24} height={24} onClick={onClear}>
            <path d={'M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12z'}/>
        </svg>)
    }

    return (
        <div className={'auto-complete'} data-open={isListVisible} onMouseDown={onMouseDown} ref={view}>
            <input
                id={id}
                type={'text'}
                defaultValue={term}
                // readOnly={disabled}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                ref={input}
            />
            { clearButton }
            { recentList }
        </div>
    )
}

const sortByRecent = ((a, b) => {
    let dif = (a.lastSearch || 0) - (b.lastSearch || 0);
    if (dif === 0) {
        return 0;
    }
    return (dif > 0) ? -1 : 1
});

export default AutoComplete;