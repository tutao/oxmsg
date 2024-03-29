import type {CFB$Container} from "cfb"
import CFB from "cfb"

/**
 * wrapper around SheetJS CFB to produce FAT-like compound file
 * terminology:
 * 'storage': directory in the cfb
 * 'stream' : file in the cfb
 * */
export class CFBStorage {
    /** underlying cfb container */
    _cfb: CFB$Container

    /** the current path all new storages and streams will be added to*/
    _path: string

    constructor(cfb?: CFB$Container) {
        this._cfb = cfb ?? CFB.utils.cfb_new()
        this._path = ""
    }

    /**
     * add substorage to this (doesn't modify the underlying CFBContainer)
     * @param name {string} name of the subdir
     * @returns {CFBStorage} a storage that will add storage and streams to the subdir
     * */
    addStorage(name: string): CFBStorage {
        const child = new CFBStorage(this._cfb)
        child._path = this._path + "/" + name
        return child
    }

    /**
     *
     */
    getStorage(name: string): CFBStorage {
        return this.addStorage(name)
    }

    /**
     * add a stream (file) to the cfb at the current _path. creates all parent dirs if they don't exist yet
     * should the stream already exist, this will replace the contents.
     * @param name {string} the name of the new stream
     * @param content {Uint8Array} the contents of the stream
     * @return {void}
     * */
    addStream(name: string, content: Uint8Array): void {
        const entryIndex = this._getEntryIndex(name)

        if (entryIndex < 0) {
            CFB.utils.cfb_add(this._cfb, this._path + "/" + name, content)
        } else {
            this._cfb.FileIndex[entryIndex].content = content
        }
    }

    /**
     * get the contents of a stream or an empty array
     * @param name {string} the name of the stream
     * @return {Uint8Array} the contents of the named stream, empty if it wasn't found
     * TODO: should this be absolute?
     */
    getStream(name: string): Uint8Array {
        const entryIndex = this._getEntryIndex(name)

        return entryIndex < 0 ? Uint8Array.of() : Uint8Array.from(this._cfb.FileIndex[entryIndex].content)
    }

    /** write the contents of the cfb container to a byte array */
    toBytes(): Uint8Array {
        return Uint8Array.from(CFB.write(this._cfb) as any)
    }

    _getEntryIndex(name: string): number {
        return this._cfb.FullPaths.findIndex(p => p === this._path + "/" + name)
    }
}