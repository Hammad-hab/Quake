VID = {};

VID.d_8to24table = new Uint32Array(new ArrayBuffer(1024));

VID.SetPalette = function()
{
	var palette = COM.LoadFile('gfx/palette.lmp');
	if (palette == null)
		Sys.Error('Couldn\'t load gfx/palette.lmp');
	var pal = new Uint8Array(palette);
	var i, src = 0;
	for (i = 0; i < 256; ++i)
	{
		VID.d_8to24table[i] = pal[src] + (pal[src + 1] << 8) + (pal[src + 2] << 16);
		src += 3;
	}
};

VID.Init = function()
{
	GL.Init();
	VID.SetPalette();
};

VID.HideLoadScreen = function()
{
	var loadscreen = document.getElementById('loadscreen');
	if (loadscreen == null)
		return;
	if (window.WebQuakeLoadProgress != null)
		window.WebQuakeLoadProgress('Entering the slipgate...', 100);
	loadscreen.classList.add('loadscreen-hidden');
	setTimeout(function()
	{
		loadscreen.style.display = 'none';
	}, 500);
};