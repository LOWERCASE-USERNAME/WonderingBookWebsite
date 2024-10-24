import React, { useCallback, useEffect, useRef, useState } from "react";
import { getGoogleBooks } from "../../../services/googleBookService";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { GoogleBook } from "../../../types/googleBook";
import { CommonComponentProps } from "../../../lib/props";
import _debounce from "lodash/debounce";

interface GoogleBooksAutocompleteProps extends CommonComponentProps {
  handleBookChange: (book: GoogleBook | null) => void;
}


export const GoogleBooksAutocomplete = ({ handleBookChange, className }: GoogleBooksAutocompleteProps) => {
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const booksRef = useRef<GoogleBook[]>([]);

  // Debounced function to search books after user stops typing
  const searchBooksDebounced = useCallback(
    _debounce(async (query: string, callback: (options: any) => void) => {
      if (query.length < 3) {
        callback([]);
        return;
      }

      const response = await getGoogleBooks(query);
      booksRef.current = response;
      const options = response.map((book) => ({
        value: book.id,
        label: `${book.title} - ${book.authors}`,
      }));
      callback(options);  // Pass options to the select
    }, 500),  // 500ms debounce delay
    []
  );

  // Load options with debounce
  const loadOptions = (inputValue: string, callback: (options: any) => void) => {
    searchBooksDebounced(inputValue, callback);
  };

  const handleSelectChange = (selectedOption: any) => {
    if (!selectedOption) {
      handleBookChange(null);
    } else {
      const book = booksRef.current.find((b) => b.id === selectedOption.value);
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