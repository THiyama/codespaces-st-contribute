/**
 * Copyright (c) Streamlit Inc. (2018-2022) Snowflake Inc. (2022)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import { render } from "@streamlit/lib/src/test_util"
import { screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import Fires, { Props, NUM_FIRES } from "./Fires"

const getProps = (): Props => ({
  scriptRunId: "51522269",
})

describe("Fires element", () => {
  jest.useFakeTimers()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it("renders without crashing", () => {
    const props = getProps()
    render(<Fires {...props} />)

    const fireElement = screen.getByTestId("fires")
    expect(fireElement).toBeInTheDocument()

    const fireImages = screen.getAllByRole("img")
    expect(fireImages.length).toBe(NUM_FIRES)

    fireImages.forEach(node => {
      expect(node).toHaveAttribute("src")
    })
  })

  it("renders as hidden element", () => {
    const props = getProps()
    render(<Fires {...props} />)

    const fireElement = screen.getByTestId("fires")
    expect(fireElement).toHaveClass("stHidden")
  })
})
