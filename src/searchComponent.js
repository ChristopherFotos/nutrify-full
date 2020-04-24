import React, { useState } from "react";
import logo from "./LOGO-small.svg";
import SearchSummary from "./searchSummary";
import MoreSearchOptions from "./MoreSearchOptions";
import SearchDropdown from "./searchDropdown";
import anim from "./animations";

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    balanced: false,
    lowCarb: false,
    lowFat: false,
    lowSodium: false,
    highFiber: false,
    highProtein: false,
  });
  const [query, setQuery] = useState();
  const [isExpanded, toggleExpand] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    //the line below calls the function and passes it the values from the input and the dropdown
    props.onClick(input, searchOptions);
    setQuery(input, searchOptions);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const updateOptions = (e) => {
    e.target.name === "low carb"
      ? (searchOptions.lowCarb = !searchOptions.lowCarb)
      : (searchOptions.lowCarb = searchOptions.lowCarb);

    e.target.name === "low fat"
      ? (searchOptions.lowFat = !searchOptions.lowFat)
      : (searchOptions.lowFat = searchOptions.lowFat);

    e.target.name === "balanced"
      ? (searchOptions.balanced = !searchOptions.balanced)
      : (searchOptions.balanced = searchOptions.balanced);

    e.target.name === "high protein"
      ? (searchOptions.highProtein = !searchOptions.highProtein)
      : (searchOptions.highProtein = searchOptions.highProtein);

    e.target.name === "high fiber"
      ? (searchOptions.highFiber = !searchOptions.highFiber)
      : (searchOptions.highFiber = searchOptions.highFiber);

    e.target.name === "low sodium"
      ? (searchOptions.lowSodium = !searchOptions.lowSodium)
      : (searchOptions.lowSodium = searchOptions.lowSodium);

    console.log(searchOptions);

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
    let childArray = Array.from(
      document.getElementById("search-options-expand").children
    );

    childArray.forEach((elem) => {
      elem.style.display = "none";
    });

    toggleExpand(!isExpanded);

    let elem = document.getElementById("search-options-expand");
    let height = 0;
    let targetValue = 300;
    let increment = 56;
    let friction = 0.82;

    function slideDown(t) {
      increment *= friction;
      height += increment;

      elem.style.height = height + "px";

      let req = requestAnimationFrame(slideDown);

      if (height > 250) {
        console.log("conditional true");

        childArray.forEach((elem) => {
          elem.style.display = "block";
          document.getElementById("search-options-expand").style.display =
            "block";
          document.getElementById("search-options-expand").style.height =
            "100%";
          cancelAnimationFrame(req);
        });
      }
    }

    slideDown();

    document.getElementById("search-options-expand").style.display = "block";
  };

  const toggleOff = () => {
    let childArray = Array.from(
      document.getElementById("search-options-expand").children
    );

    toggleExpand(!isExpanded);

    let elem = document.getElementById("search-options-expand");
    let height = 300;
    let targetValue = 0;
    let increment = -35;
    let friction = 0.92;

    function slideUp(t) {
      height += increment;
      increment *= friction;
      elem.style.height = height + "px";

      console.log("animating");

      let req = requestAnimationFrame(slideUp);

      if (height < 100) {
        childArray.forEach((elem) => {
          elem.style.display = "none";
          document.getElementById("search-options-expand").style.display =
            "none";
          cancelAnimationFrame(req);
        });
      }
    }

    slideUp();
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
