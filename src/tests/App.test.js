import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react'
import App from "../components/App";

// Test whether App component renders loading image then redirects Error Page or Home Page correctly

describe("Test if it renders the correct component according to the response of fetching", () => {
  
  afterEach(cleanup);

  it('render LandingPage after fetching data successfully', async () => {
    const wrapper = render(<App />); // execute fetch with correct api = "http://131.181.190.87:3001/all"
    console.log("testing-library before response");
    expect(wrapper.getByAltText("loaing animation")).toBeInTheDocument(); // render Loading component
    
    await waitForDomChange(wrapper);
    console.log("testing-library after resolve");
    expect(wrapper.getByText("Welcome to our page.")).toBeInTheDocument(); // render LandingPage component
  
    cleanup();
  });
  
  
  it('jump to ErrorPage after catching Error', async () => {
    // Create spy that returns Promise.reject
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error())
    );
    
    const wrapper = render(<App />);
    console.log("testing-library before response");
    expect(wrapper.getByAltText("loaing animation")).toBeInTheDocument(); // render Loading component
    
    await waitForDomChange(wrapper);
    console.log("testing-library after reject");
    expect(wrapper.getByAltText("error")).toBeInTheDocument(); // render ErrorPage component
  
    global.fetch.mockRestore();
    cleanup();
  });
});

