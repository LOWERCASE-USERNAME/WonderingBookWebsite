import React, { useEffect, useRef, useState } from "react";
import { getGoogleBooks } from "../../../services/googleBookService";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { GoogleBook } from "../../../types/googleBook";
import { CommonComponentProps } from "../../../lib/props";

interface GoogleBooksAutocompleteProps extends CommonComponentProps {
  handleBookChange: (book: GoogleBook | null) => void;
}


export const GoogleBooksAutocomplete = ({ handleBookChange, className }: GoogleBooksAutocompleteProps) => {
  const [books, setBooks] = useState<GoogleBook[]>([]);

  const searchBooks = async (query: string) => {
    if (query.length < 3) return; // To avoid too many requests on short input

    const response = await getGoogleBooks(query);
    setBooks(response);
    return response;
  };

  const loadOptions = async (inputValue: string, callback: (options: GoogleBook[]) => void) => {
    const results = await searchBooks(inputValue);
    const options = results.map((book: GoogleBook) => ({
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

  return (
    <AsyncSelect
      className={className}
      cacheOptions
      // Asynchronous loading of options
      loadOptions={loadOptions}
      onChange={handleSelectChange}
      placeholder="Tìm kiếm cuốn sách..."
      isClearable
      defaultOptions={[]} // Load default empty state
      noOptionsMessage={() => "Không tìm thấy đầu sách nào phù hợp"}
    />
  );
};