
import React, { useState } from 'react';
import AutoComplete from './components/autoComplete';
import Label from './components/Label';
import { translate } from './lang';

const DB = [
    { title: 'react js',  url: 'https://reactjs.org/', description: 'Declarative. React makes it painless to create interactive UIs. · Component-Based. Build encapsulated components that manage their own state, then compose long long long long long long long long ' },
    { title: 'react js tutorial',  url: 'https://reactjs.org/tutorial/tutorial.html', description: 'long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long description' },
    { title: 'react jsx',  url: 'https://reactjs.org/docs/introducing-jsx.html', description: 'long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long Text' },
    { title: 'react jwt',  url: 'https://www.npmjs.com/package/react-jwt', description: 'Small library for decoding json web tokens (JWT). Latest version: 1.1.6, last published: a month ago.' },
    { title: 'react jss',  url: 'https://cssinjs.org/react-jss/', description: 'long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long Label' },
    { title: 'react jsx for loop',  url: 'https://stackoverflow.com/questions/22876978/loop-inside-react-jsx', description: '' },
    { title: 'react js example',  url: 'https://stackoverflow.com/questions/22876974', description: '' },
    { title: 'react js documentation',  url: 'https://stackoverflow.com/questions/22876972', description: '' },
    { title: 'react js interview questions',  url: 'https://stackoverflow.com/questions/22876933', description: '' },
    { title: 'react json schema form',  url: 'https://stackoverflow.com/questions/22876928', description: '' },
    { title: 'react',  url: 'https://stackoverflow.com/questions/22676978', description: '' },
]

const App = (props) => {

    const [historyList, updateItems] = useState(DB);
    const [searchTerm, setSearchTerm] = useState('');

    let onSearch = (value) => {
        value = value.replace(/\s\s+/g, ' ');
        let searchItem = historyList.find(item => item.title.toLocaleLowerCase() === value.toLocaleLowerCase());
        if (searchItem) {
            searchItem.lastSearch = new Date().getTime();
            updateItems(historyList);
        } else {
            // let newList = historyList.concat([{ title: value, description: '', url: '', lastSearch: new Date().getTime() }]);
            // updateItems(newList);
        }
        setSearchTerm(value)
    }

    let onRemove = (value) => {
        let list = historyList.concat();
        list = list.filter(item => item.title !== value.title);
        updateItems(list);
    }

    let resultListView = null;
    if (searchTerm) {
        var pattern = new RegExp(searchTerm.toLocaleLowerCase());
        let resultList = historyList.filter(item => pattern.test(item.title.toLocaleLowerCase())).map(item => {
            let { title, url, description, lastSearch } = item;
    
            return (<li key={title} data-recent={Boolean(lastSearch)} className='flx-col'>
                    <h3><a href={url}>{title}</a></h3>
                    <Label text={description}/>
            </li>)
        });
        if (resultList.length) {
            resultListView = <ul className='result-list flx-col'>{ resultList }</ul>
        } else {

            let infoText = translate('no-match').replace('%s', searchTerm)
            
            resultListView = (<div className='no-match-view flx-col'>
                <Label text={infoText}/>
                <Label text={`${translate('suggestions')}:`}/>
                <Label text={`${translate('suggestions-options')}`}/>
            </div>)
        }
    }

    
    return (
        <div className='main-view flx-col'>
            <div className='flx-col top-header'>
                <Label className='h' text={translate('search-x')} />
                <AutoComplete placeholder={translate('search')} 
                        onSearch={onSearch} 
                        onRemove={onRemove} 
                        history={historyList}/>
            </div>
           { resultListView }
        </div>
    )
}

export default App;