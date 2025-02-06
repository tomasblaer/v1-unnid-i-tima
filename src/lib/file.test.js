import { describe, expect, test } from "@jest/globals";
import { fileExists } from "./file";

const NONEXISTENT_DIR = './dist/nonexistent.json'

describe('file', () => {
    describe('fileExists', ()  => {
        test('Non-existent directories return false', async () => {
            const res = await fileExists(NONEXISTENT_DIR);
            expect(res).toEqual(false);
        })
    })
})