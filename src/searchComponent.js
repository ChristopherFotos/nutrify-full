import React, { useState } from "react";
import logo from "./LOGO-small.svg";
import SearchSummary from "./searchSummary";
import MoreSearchOptions from "./MoreSearchOptions";
import SearchDropdown from "./searchDropdown";
import anim from "./animations";

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchOptions, setSearchOptions] = useState("");
  const [query, setQuery] = useState();
  const [isExpanded, toggleExpand] = useState(false);

  let options = {};

  const handleClick = (e) => {
    e.preventDefault();
    //the line below calls the function and passes it the values from the input and the dropdown
    props.onClick(input, options);
    setQuery(input, options);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const updateOptions = (e) => {
    e.target.name === "low carb"
      ? (options.lowCarb = !options.lowCarb)
      : (options.lowCarb = options.lowCarb);

    e.target.name === "low fat"
      ? (options.lowFat = !options.lowFat)
      : (options.lowFat = options.lowFat);

    e.target.name === "balanced"
      ? (options.balanced = !options.balanced)
      : (options.balanced = options.balanced);

    e.target.name === "high protein"
      ? (options.highProtein = !options.highProtein)
      : (options.highProtein = options.highProtein);

    e.target.name === "high fiber"
      ? (options.highFiber = !options.highFiber)
      : (options.highFiber = options.highFiber);

    e.target.name === "low sodium"
      ? (options.lowSodium = !options.lowSodium)
      : (options.lowSodium = options.lowSodium);

    console.log(options);

    const setQueryOnClick = (e) => {
      setQuery(e.target.value);
    };
  };

  const renderSearchSummary = () => {
    if (query) {
      return <SearchSummary queries={input}></SearchSummary>;
    } else return null;
  };

  const toggle = () => {
    // console.log("top of method 1: ", isExpanded);
    // toggleExpand(!isExpanded);
    // console.log("middle of method 1: ", isExpanded);
    // anim.slideHeight("search-options-expand", 30, 400, 0.9);
    // console.log("end of method 1: ", isExpanded);
    // console.log(
    //   "style 1: ",
    //   document.getElementById("search-options-expand").style
    // );
    let childArray = Array.from(
      document.getElementById("search-options-expand").children
    );
    toggleExpand(!isExpanded);
    document.getElementById("search-options-expand").style.height = "100%";
    childArray.forEach((elem) => {
      elem.style.display = "inline-block";
    });
  };

  const toggleOff = () => {
    // console.log("top of method 2: ", isExpanded);
    // toggleExpand(!isExpanded);
    // console.log("middle of method 2: ", isExpanded);
    // anim.slideHeight("search-options-expand", -30, 0, 0.9);
    // console.log("end of method 2: ", isExpanded);
    // console.log(
    //   "style 2: ",
    //   document.getElementById("search-options-expand").style
    // );

    let childArray = Array.from(
      document.getElementById("search-options-expand").children
    );
    toggleExpand(!isExpanded);
    document.getElementById("search-options-expand").style.height = "0";
    childArray.forEach((elem) => {
      elem.style.display = "none";
    });
  };

  const renderOptions = () => {
    if (isExpanded) {
      return <SearchDropdown updateOptions={updateOptions}></SearchDropdown>;
    }
  };

  return (
    <form className="search-form">
      <div className="search-flexbox-span flex-align-bottom">
        <img src={logo} className="logo"></img>
        <span className="subline">powered by edamam</span>
      </div>
      <input
        type="text"
        id="search-bar"
        value={input}
        onChange={handleChange}
        className="search-bar"
        placeholder="search by ingredient or recipe name"
      ></input>
      <div className="search-flexbox-span">
        <a
          className="waves-effect waves-light btn search-button"
          onClick={handleClick}
        >
          search
        </a>

        <MoreSearchOptions
          onClick={isExpanded ? toggleOff : toggle}
        ></MoreSearchOptions>
      </div>
      <SearchDropdown updateOptions={updateOptions}></SearchDropdown>
      <SearchSummary query={query}></SearchSummary>
    </form>
  );
};

export default SearchBar;
