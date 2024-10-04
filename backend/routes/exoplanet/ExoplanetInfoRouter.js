const express = require('express');
const router = express.Router();

router.post('/details/:planet_name', async (req, res) => {
    const planetName = req.params.planet_name;

    try {
        const query = `
            SELECT 
                pl_name, 
                pl_letter, 
                hostname, 
                disc_pubdate, 
                disc_year, 
                discoverymethod, 
                disc_locale, 
                disc_facility, 
                disc_instrument, 
                disc_telescope, 
                glon, 
                glat, 
                elon, 
                elat, 
                pl_orbper, 
                pl_orbsmax, 
                pl_orbincl, 
                pl_orbeccen, 
                pl_eqt, 
                pl_dens, 
                sy_dist, 
                x, 
                y, 
                z, 
                pl_rvamp, 
                pl_radj, 
                pl_rade, 
                pl_ratror, 
                pl_ratdor, 
                rowupdate, 
                pl_pubdate, 
                pl_imppar, 
                pl_cmassj, 
                pl_cmasse, 
                pl_massj, 
                pl_masse, 
                pl_bmassj, 
                pl_bmasse, 
                pl_bmassprov, 
                pl_msinij, 
                pl_msinie, 
                st_teff, 
                st_radv, 
                st_vsin, 
                st_lum, 
                st_age, 
                st_mass, 
                st_dens, 
                st_rad, 
                soltype, 
                sy_snum, 
                sy_pnum, 
                sy_mnum, 
                st_nphot, 
                st_nrvc, 
                st_nspec, 
                pl_nespec, 
                pl_ntranspec, 
                pl_ndispec 
            FROM exoplanet_data 
            WHERE pl_name = $1
        `;

        const result = await req.pool.query(query, [planetName]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Planet not found'
            });
        }

        const planet = result.rows[0];

        const formattedPlanet = {
            pl_name: planet.pl_name || '----',
            pl_letter: planet.pl_letter || '----',
            hostname: planet.hostname || '----',
            disc_pubdate: planet.disc_pubdate ? planet.disc_pubdate.toISOString().split('T')[0] : '----',
            disc_year: planet.disc_year !== null ? planet.disc_year : '----',
            discoverymethod: planet.discoverymethod || '----',
            disc_locale: planet.disc_locale || '----',
            disc_facility: planet.disc_facility || '----',
            disc_instrument: planet.disc_instrument || '----',
            disc_telescope: planet.disc_telescope || '----',
            glon: planet.glon  ? planet.glon : '----',
            glat: planet.glat  ? planet.glat : '----',
            elon: planet.elon  ? planet.elon : '----',
            elat: planet.elat  ? planet.elat : '----',
            pl_orbper: planet.pl_orbper  ? planet.pl_orbper : '----',
            pl_orbsmax: planet.pl_orbsmax  ? planet.pl_orbsmax : '----',
            pl_orbincl: planet.pl_orbincl  ? planet.pl_orbincl : '----',
            pl_orbeccen: planet.pl_orbeccen  ? planet.pl_orbeccen : '----',
            pl_eqt: planet.pl_eqt  ? planet.pl_eqt : '----',
            pl_dens: planet.pl_dens  ? planet.pl_dens : '----',
            sy_dist: planet.sy_dist  ? planet.sy_dist : '----',
            x: planet.x  ? planet.x : '----',
            y: planet.y  ? planet.y : '----',
            z: planet.z  ? planet.z : '----',
            pl_rvamp: planet.pl_rvamp ? planet.pl_rvamp : '----',
            pl_radj: planet.pl_radj  ? planet.pl_radj : '----',
            pl_rade: planet.pl_rade  ? planet.pl_rade : '----',
            pl_ratror: planet.pl_ratror  ? planet.pl_ratror : '----',
            pl_ratdor: planet.pl_ratdor ? planet.pl_ratdor : '----',
            rowupdate: planet.rowupdate ? planet.rowupdate.toISOString() : '----',
            pl_pubdate: planet.pl_pubdate ? planet.pl_pubdate.toISOString().split('T')[0] : '----',
            pl_imppar: planet.pl_imppar  ? planet.pl_imppar : '----',
            pl_cmassj: planet.pl_cmassj ? planet.pl_cmassj : '----',
            pl_cmasse: planet.pl_cmasse  ? planet.pl_cmasse : '----',
            pl_massj: planet.pl_massj ? planet.pl_massj : '----',
            pl_masse: planet.pl_masse  ? planet.pl_masse : '----',
            pl_bmassj: planet.pl_bmassj  ? planet.pl_bmassj : '----',
            pl_bmasse: planet.pl_bmasse  ? planet.pl_bmasse : '----',
            pl_bmassprov: planet.pl_bmassprov || '----',
            pl_msinij: planet.pl_msinij  ? planet.pl_msinij : '----',
            pl_msinie: planet.pl_msinie  ? planet.pl_msinie : '----',
            st_teff: planet.st_teff  ? planet.st_teff : '----',
            st_radv: planet.st_radv  ? planet.st_radv : '----',
            st_vsin: planet.st_vsin ? planet.st_vsin : '----',
            st_lum: planet.st_lum  ? planet.st_lum : '----',
            st_age: planet.st_age  ? planet.st_age : '----',
            st_mass: planet.st_mass  ? planet.st_mass : '----',
            st_dens: planet.st_dens  ? planet.st_dens : '----',
            st_rad: planet.st_rad  ? planet.st_rad : '----',
            soltype: planet.soltype || '----',
            sy_snum: planet.sy_snum  ? planet.sy_snum : '----',
            sy_pnum: planet.sy_pnum  ? planet.sy_pnum : '----',
            sy_mnum: planet.sy_mnum  ? planet.sy_mnum : '----',
            st_nphot: planet.st_nphot ? planet.st_nphot : '----',
            st_nrvc: planet.st_nrvc  ? planet.st_nrvc : '----',
            st_nspec: planet.st_nspec  ? planet.st_nspec : '----',
            pl_nespec: planet.pl_nespec  ? planet.pl_nespec : '----',
            pl_ntranspec: planet.pl_ntranspec  ? planet.pl_ntranspec : '----',
            pl_ndispec: planet.pl_ndispec  ? planet.pl_ndispec : '----'
        };

        res.status(200).json({
            success: true,
            planet: formattedPlanet
        });

    } catch (error) {
        console.error('Error fetching planet data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/view_increment', async (req, res) => {
    const {planetName} = req.body;
    console.log(planetName)
    try {
        const query = `
            UPDATE exoplanet_data 
            SET times_visited = times_visited + 1 
            WHERE pl_name = $1
        `;

        const result = await req.pool.query(query, [planetName]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Planet not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Times visited incremented successfully'
        });

    } catch (error) {
        console.error('Error incrementing times visited:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


module.exports = router    

