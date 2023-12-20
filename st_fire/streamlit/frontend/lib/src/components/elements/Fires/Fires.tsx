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

import React, { FC, memo } from "react"

/*
 * IMPORTANT: If you change the asset imports below, make sure they still work if Streamlit is
 * served from a subpath.
 */
import Fire0 from "@streamlit/lib/src/assets/img/fires/fire-0.png"

import Particles from "@streamlit/lib/src/components/elements/Particles"
import { ParticleProps } from "@streamlit/lib/src/components/elements/Particles/Particles"

import { StyledFire } from "./styled-components"

export const NUM_FIRES = 100

const FIRE_IMAGES: string[] = [Fire0]

const NUM_FIRE_TYPES = FIRE_IMAGES.length

export interface Props {
  scriptRunId: string
}

const Fire: FC<ParticleProps> = ({ particleType }) => (
  <StyledFire src={FIRE_IMAGES[particleType]} />
)

const Fires: FC<Props> = ({ scriptRunId }) => (
  // Keys should be unique each time, so React replaces the images in the DOM and their animations
  // actually rerun.
  <Particles
    className="fires"
    scriptRunId={scriptRunId}
    numParticleTypes={NUM_FIRE_TYPES}
    numParticles={NUM_FIRES}
    ParticleComponent={Fire}
  />
)

export default memo(Fires)
