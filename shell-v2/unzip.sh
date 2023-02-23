#!/usr/bin/env bash

indir=$(pwd)
outdir=$(pwd)/extracted
archivedir=$(pwd)/../finished
extraagrs=-aoa

password=kan84.net;
password2=kan84.tv;

cd $indir
echo "Workdir $(pwd)"
if [ ! -d ${outdir} ] ; then
    mkdir ${outdir};
fi

if [ ! -d ${archivedir} ] ; then
    mkdir ${archivedir};
fi

try_with_password1() {
    7z x "-p${password}" "${extraargs}" "-o${outdir}" "${one}"
    RET=$?
    if [ ${RET} -ne 0 ] ; then
	echo "Cannot process ${one}";
	return 1;
    fi
    return 0;
}


try_with_password2() {
    7z x "-p${password2}""${extraargs}" "-o${outdir}" "${one}"
    RET=$?
    if [ ${RET} -ne 0 ] ; then
	echo "Cannot process ${one}";
	return 1;
    fi
    return 0;
}

# Change the IFS
OLDIFS=$IFS
IFS=$'\n'

fileArray=($(find ${indir} -name '*7z'))

# restore it
IFS=$OLDIFS

# get length of an array
tLen=${#fileArray[@]}
 
# use for loop read all filenames
for (( i=0; i<${tLen}; i++ ));
do
    one=${fileArray[$i]}
    echo "Processing --- ${one}"
    try_with_password1;
    RET=$?;
    if [ ${RET} -ne 0 ]; then
       try_with_password2;
       RET=$?;
       if [ ${RET} -ne 0 ]; then
	  exit 1;
       fi
    fi
    mv "${one}" "${archivedir}/"
    echo "Completed --- ${one}"
done
