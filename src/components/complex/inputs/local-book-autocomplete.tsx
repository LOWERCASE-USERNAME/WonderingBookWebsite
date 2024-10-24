import React, { useEffect, useRef, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { CommonComponentProps } from "../../../lib/props";
import { Book } from "../../../types/book";
import { searchBooksByName } from "../../../services/bookService";

interface LocalBooksAutocompleteProps extends CommonComponentProps {
  handleBookChange: (book: Book | null) => void;
  placeholder?: string
  handleInputChange?: (newValue: string) => void
  setIsSearchByQuery?: (isSearchByQuery: boolean) => void
  // ref?: React.ForwardedRef<Select>;
}


export const LocalBooksAutocomplete = ({ handleBookChange, className, placeholder, handleInputChange, setIsSearchByQuery }: LocalBooksAutocompleteProps) => {
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async (query: string) => {
    // if (query.length < 3) return; // To avoid too many requests on short input

    const response = await searchBooksByName(query);
    setBooks(response);
    return response;
  };

  const loadOptions = async (inputValue: string, callback: (options: Book[]) => void) => {
    const results = await searchBooks(inputValue);
    const options = results.map((book: Book) => ({
      value: book.id,
      label: `${book.title} - ${book.authors}`,
    }));
    callback(options);
  };

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption == null) {
      handleBookChange(null);
    } else {
      const book = books.find((b) => b.id === selectedOption.value);
      handleBookChange(book ?? null);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      outline: "none",
      border: "none",
      boxShadow: 'none',

    }),
    menu: (base) => ({
      ...base,
      textWrap: "nowrap",
      fontSize: "14px",
      width: "fit-content"
    })
  }

  return (
    <AsyncCreatableSelect
      ref={null}
      className={className}
      cacheOptions
      onInputChange={(input, action) => {
        if (action.action === "input-change") {
          handleInputChange?.(input);
        }
      }}
      // Asynchronous loading of options
      loadOptions={loadOptions}
      onChange={handleSelectChange}
      placeholder={placeholder ?? "Tìm kiếm cuốn sách..."}
      isClearable
      formatCreateLabel={(inputValue) => `Tìm kiếm "${inputValue}"`}
      onCreateOption={() => setIsSearchByQuery?.(true)}
      styles={customStyles}
      defaultOptions={[]} // Load default empty state
      noOptionsMessage={() => "Không tìm thấy đầu sách nào phù hợp"}
      menuPortalTarget={document.body}
    />
  );
};